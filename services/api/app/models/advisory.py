from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

class PriorityAction(BaseModel):
    asset_id: str
    target_name: str
    asset_type: str
    action: str
    urgency: str  # IMMEDIATE, NEXT_3_HOURS, STANDBY
    evidence_ids: List[str]

class PublicAlerts(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    en: str
    hi: str
    or_text: str = Field(..., alias="or")
    sms_version: str

class AdvisoryEvidencePacket(BaseModel):
    analysis_id: str
    cyclone_name: str
    category: str
    max_winds_kmh: float
    landfall_target: str
    inundation_scenario: str
    high_risk_districts: List[str]
    top_threats: List[Dict[str, Any]]
    blocked_arteries: List[str]
    data_timestamp: str
    confidence: str

class GroundedAdvisory(BaseModel):
    advisory_id: str
    analysis_id: str
    timestamp_utc: str
    situation_summary: str
    priority_actions: List[PriorityAction]
    public_alerts: PublicAlerts
    uncertainties: List[str]
    approval_required: bool = True
    official_source_link: str

class AdvisoryApprovalRequest(BaseModel):
    advisory_id: str
    officer_id: str
    officer_name: str
    deoc_center: str
    approved_text_en: str
    approved_text_hi: str
    approved_text_or: str
    dispatch_channels: List[str] = ["CAP_SERVER", "DISTRICT_SMS_GATEWAY", "POLICE_VHF"]

class DispatchReceipt(BaseModel):
    receipt_id: str
    advisory_id: str
    status: str
    approved_by: str
    deoc_center: str
    dispatched_at_utc: str
    dispatch_channels: List[str]
    evidence_trail: List[str]
    audit_hash: str
