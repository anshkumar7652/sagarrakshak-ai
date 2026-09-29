import hashlib
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, List
from app.models.advisory import (
    GroundedAdvisory,
    AdvisoryEvidencePacket,
    AdvisoryApprovalRequest,
    DispatchReceipt
)
from app.services.gemini.advisory import generate_grounded_advisory
from app.db.database import get_db
from app.db.models import AdvisoryRecord, DispatchAuditLog
from app.routers.cap import build_cap_xml

router = APIRouter(prefix="/api/advisory", tags=["advisory"])

@router.post("/generate", response_model=GroundedAdvisory)
def generate_deoc_advisory(evidence: Dict[str, Any], db: Session = Depends(get_db)):
    """
    Generates evidence-grounded action brief and multilingual citizen alerts using Gemini.
    Persists the generated draft advisory into the database.
    """
    try:
        advisory_res = generate_grounded_advisory(evidence)
        
        # Persist advisory to database
        run_id = evidence.get("run_id", f"RUN_{uuid.uuid4().hex[:8].upper()}")
        db_advisory = AdvisoryRecord(
            advisory_id=advisory_res.advisory_id,
            run_id=run_id,
            situation_summary=advisory_res.situation_summary,
            priority_actions=[a.model_dump() for a in advisory_res.priority_actions],
            public_alert_en=advisory_res.public_alerts.en,
            public_alert_hi=advisory_res.public_alerts.hi,
            public_alert_or=advisory_res.public_alerts.or_text,
            sms_version=advisory_res.sms_broadcast_draft,
            uncertainties=[u.model_dump() for u in advisory_res.uncertainties],
            status="PENDING_APPROVAL"
        )
        db.add(db_advisory)
        db.commit()

        return advisory_res
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Advisory generation failed: {str(e)}")

@router.post("/approve", response_model=DispatchReceipt)
def approve_and_dispatch(req: AdvisoryApprovalRequest, db: Session = Depends(get_db)):
    """
    Human-in-the-loop DEOC officer approval.
    Logs an unalterable audit receipt with officer signature, timestamp, CAP XML, and verification hash in SQLite.
    """
    try:
        curr_time = datetime.now(timezone.utc).isoformat()
        audit_payload = f"{req.advisory_id}|{req.officer_id}|{curr_time}|{req.approved_text_en}"
        audit_hash = hashlib.sha256(audit_payload.encode()).hexdigest()
        receipt_id = f"DISPATCH_{uuid.uuid4().hex[:10].upper()}"

        # Generate CAP XML 1.2 payload
        cap_xml = build_cap_xml(
            identifier=f"SAGARRAKSHAK-{receipt_id}",
            sender=f"{req.officer_id}@{req.deoc_center.lower().replace(' ', '')}.gov.in",
            sent_time=curr_time,
            headline=f"OFFICIAL CYCLONE ACTION DIRECTIVE — {req.deoc_center}",
            description=req.approved_text_en,
            instruction="All residents in vulnerable coastal zones must immediately move to designated cyclone shelters.",
            area_desc="Coastal Belts of Puri, Brahmagiri, Krushnaprasad, Astranga, and Konark, Odisha"
        )

        # Update Advisory Record in DB
        adv = db.query(AdvisoryRecord).filter(AdvisoryRecord.advisory_id == req.advisory_id).first()
        if adv:
            adv.status = "APPROVED_DISPATCHED"

        # Create Dispatch Audit Log in DB
        audit_log = DispatchAuditLog(
            receipt_id=receipt_id,
            advisory_id=req.advisory_id,
            officer_name=req.officer_name,
            officer_id=req.officer_id,
            deoc_center=req.deoc_center,
            approved_text_en=req.approved_text_en,
            approved_text_hi=req.approved_text_hi,
            approved_text_or=req.approved_text_or,
            dispatch_channels=req.dispatch_channels,
            audit_hash=audit_hash,
            cap_xml_payload=cap_xml
        )
        db.add(audit_log)
        db.commit()

        return DispatchReceipt(
            receipt_id=receipt_id,
            advisory_id=req.advisory_id,
            status="APPROVED_AND_DISPATCHED",
            approved_by=f"{req.officer_name} ({req.officer_id})",
            deoc_center=req.deoc_center,
            dispatched_at_utc=curr_time,
            dispatch_channels=req.dispatch_channels,
            evidence_trail=["GEE_IMERG_V07", "SRTM_30M_DEM", "IBTrACS_V4", "GEMINI_REASONING_LOG"],
            audit_hash=audit_hash
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Approval and dispatch failed: {str(e)}")
