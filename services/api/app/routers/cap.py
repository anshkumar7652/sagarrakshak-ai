import datetime
import xml.etree.ElementTree as ET
from fastapi import APIRouter, Response, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import AdvisoryRecord, DispatchAuditLog

router = APIRouter(prefix="/api/cap", tags=["cap"])

def build_cap_xml(
    identifier: str,
    sender: str,
    sent_time: str,
    headline: str,
    description: str,
    instruction: str,
    area_desc: str,
    polygon_coords: str = "19.8,85.8 20.2,85.8 20.2,86.5 19.8,86.5 19.8,85.8"
) -> str:
    """Constructs a WMO/NDMA CAP-v1.2 XML alert payload."""
    alert = ET.Element("alert", xmlns="urn:oasis:names:tc:emergency:cap:1.2")
    
    ET.SubElement(alert, "identifier").text = identifier
    ET.SubElement(alert, "sender").text = sender
    ET.SubElement(alert, "sent").text = sent_time
    ET.SubElement(alert, "status").text = "Actual"
    ET.SubElement(alert, "msgType").text = "Alert"
    ET.SubElement(alert, "scope").text = "Public"
    ET.SubElement(alert, "code").text = "NDMA-CAP-IN-V1.2"
    
    info = ET.SubElement(alert, "info")
    ET.SubElement(info, "language").text = "en-IN"
    ET.SubElement(info, "category").text = "Met"
    ET.SubElement(info, "event").text = "Extremely Severe Cyclonic Storm"
    ET.SubElement(info, "urgency").text = "Immediate"
    ET.SubElement(info, "severity").text = "Extreme"
    ET.SubElement(info, "certainty").text = "Observed"
    ET.SubElement(info, "headline").text = headline
    ET.SubElement(info, "description").text = description
    ET.SubElement(info, "instruction").text = instruction
    
    area = ET.SubElement(info, "area")
    ET.SubElement(area, "areaDesc").text = area_desc
    ET.SubElement(area, "polygon").text = polygon_coords
    
    return ET.tostring(alert, encoding="utf-8", xml_declaration=True).decode("utf-8")

@router.get("/feed.xml")
def get_cap_feed(db: Session = Depends(get_db)):
    """
    Returns standard CAP 1.2 XML feed for downstream sirens, cell broadcast towers,
    and the NDMA Sachet National Disaster Alerting Network.
    """
    latest_audit = db.query(DispatchAuditLog).order_by(DispatchAuditLog.dispatched_at_utc.desc()).first()
    
    if latest_audit and latest_audit.cap_xml_payload:
        xml_content = latest_audit.cap_xml_payload
    else:
        xml_content = build_cap_xml(
            identifier="SAGARRAKSHAK-CAP-FANI-001",
            sender="deoc.puri@odisha.gov.in",
            sent_time=datetime.datetime.utcnow().isoformat() + "+05:30",
            headline="RED ALERT: Cyclone Landfall Warning — Coastal Odisha (Puri–Khurda–Jagatsinghpur)",
            description="Extremely Severe Cyclonic Storm Fani making landfall with 200+ km/h sustained gusts and 4.5m storm surge. Inundation of low-elevation (<5m) coastal belt imminent.",
            instruction="All residents in vulnerable coastal zones must immediately evacuate to Multi-Purpose Cyclone Shelters via NH-316 elevated corridor. Power supply suspended to prevent electrocution.",
            area_desc="Coastal Belts of Puri, Brahmagiri, Krushnaprasad, Astranga, and Konark, Odisha"
        )

    return Response(content=xml_content, media_type="application/xml")

@router.get("/{advisory_id}.xml")
def get_advisory_cap_xml(advisory_id: str, db: Session = Depends(get_db)):
    """Returns the dedicated CAP XML payload for a given advisory."""
    adv = db.query(AdvisoryRecord).filter(AdvisoryRecord.advisory_id == advisory_id).first()
    
    xml_content = build_cap_xml(
        identifier=f"SAGARRAKSHAK-{advisory_id}",
        sender="deoc.odisha@gov.in",
        sent_time=datetime.datetime.utcnow().isoformat() + "+05:30",
        headline="CYCLONE EMERGENCY ACTION DIRECTIVE",
        description=adv.situation_summary if adv else "Emergency warning issued by SagarRakshak AI DEOC Decision Platform.",
        instruction=adv.public_alert_en if adv else "Move to nearest designated cyclone shelter immediately.",
        area_desc="District Emergency Operations Centre — Coastal Area of Responsibility"
    )
    return Response(content=xml_content, media_type="application/xml")
