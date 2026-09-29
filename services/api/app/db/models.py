import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Text,
    DateTime,
    ForeignKey,
    JSON
)
from sqlalchemy.orm import relationship
from .database import Base

class CycloneEvent(Base):
    __tablename__ = "cyclone_events"

    id = Column(Integer, primary_key=True, index=True)
    cyclone_id = Column(String(64), unique=True, index=True, nullable=False)
    name = Column(String(128), nullable=False)
    basin = Column(String(128), default="North Indian Ocean (Bay of Bengal)")
    category = Column(String(128), nullable=False)
    max_wind_kmh = Column(Float, nullable=False)
    min_pressure_hpa = Column(Float, nullable=False)
    landfall_location = Column(String(256), nullable=False)
    landfall_time = Column(String(64), nullable=False)
    mode = Column(String(32), default="historical")  # historical, live_simulation
    track_data = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    assessment_runs = relationship("RiskAssessmentRun", back_populates="cyclone")


class CriticalAsset(Base):
    __tablename__ = "critical_assets"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(String(64), unique=True, index=True, nullable=False)
    name = Column(String(256), nullable=False)
    type = Column(String(64), index=True, nullable=False)  # hospital, shelter, power_substation, arterial_road
    district = Column(String(128), index=True, nullable=False)
    subdistrict = Column(String(128), nullable=True)
    criticality = Column(String(64), nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    elevation_m = Column(Float, nullable=False)
    population_served = Column(Integer, default=0)
    capacity_beds = Column(Integer, nullable=True)
    capacity_persons = Column(Integer, nullable=True)
    backup_power = Column(Boolean, default=True)
    access_road_id = Column(String(64), nullable=True)
    nearest_alternative_id = Column(String(64), nullable=True)
    alternative_name = Column(String(256), nullable=True)
    alternative_dist_km = Column(Float, nullable=True)
    source = Column(String(256), default="Health Dept / OSDMA Registry")
    verification_status = Column(String(64), default="VERIFIED_OFFICIAL")


class RiskAssessmentRun(Base):
    __tablename__ = "risk_assessment_runs"

    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(String(64), unique=True, index=True, nullable=False)
    scenario_id = Column(String(64), nullable=False)
    inundation_scenario = Column(String(32), default="base")  # low, base, high
    cyclone_id = Column(Integer, ForeignKey("cyclone_events.id"), nullable=True)
    cyclone_name = Column(String(128), nullable=False)
    current_time_step = Column(String(64), nullable=False)
    total_population_at_risk = Column(Integer, nullable=False)
    high_risk_assets_count = Column(Integer, default=0)
    district_summaries = Column(JSON, nullable=False)
    top_threatened_assets = Column(JSON, nullable=False)
    weights_used = Column(JSON, nullable=True)
    confidence_level = Column(String(64), default="HIGH (Base Scenario)")
    executed_at_utc = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    cyclone = relationship("CycloneEvent", back_populates="assessment_runs")
    advisories = relationship("AdvisoryRecord", back_populates="assessment_run")


class AdvisoryRecord(Base):
    __tablename__ = "advisories"

    id = Column(Integer, primary_key=True, index=True)
    advisory_id = Column(String(64), unique=True, index=True, nullable=False)
    run_id = Column(String(64), ForeignKey("risk_assessment_runs.run_id"), nullable=False)
    situation_summary = Column(Text, nullable=False)
    priority_actions = Column(JSON, nullable=False)
    public_alert_en = Column(Text, nullable=False)
    public_alert_hi = Column(Text, nullable=False)
    public_alert_or = Column(Text, nullable=False)
    sms_version = Column(String(256), nullable=False)
    uncertainties = Column(JSON, nullable=True)
    status = Column(String(32), default="PENDING_APPROVAL")  # PENDING_APPROVAL, APPROVED_DISPATCHED
    created_at_utc = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    assessment_run = relationship("RiskAssessmentRun", back_populates="advisories")
    audit_logs = relationship("DispatchAuditLog", back_populates="advisory")


class DispatchAuditLog(Base):
    __tablename__ = "dispatch_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    receipt_id = Column(String(64), unique=True, index=True, nullable=False)
    advisory_id = Column(String(64), ForeignKey("advisories.advisory_id"), nullable=False)
    officer_name = Column(String(128), nullable=False)
    officer_id = Column(String(64), nullable=False)
    deoc_center = Column(String(256), nullable=False)
    approved_text_en = Column(Text, nullable=False)
    approved_text_hi = Column(Text, nullable=False)
    approved_text_or = Column(Text, nullable=False)
    dispatch_channels = Column(JSON, nullable=False)
    audit_hash = Column(String(128), nullable=False)
    cap_xml_payload = Column(Text, nullable=True)
    dispatched_at_utc = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    advisory = relationship("AdvisoryRecord", back_populates="audit_logs")


class MultimodalBulletinUpload(Base):
    __tablename__ = "multimodal_bulletin_uploads"

    id = Column(Integer, primary_key=True, index=True)
    upload_id = Column(String(64), unique=True, index=True, nullable=False)
    filename = Column(String(256), nullable=False)
    file_path = Column(String(512), nullable=True)
    extracted_bulletin_no = Column(String(64), nullable=True)
    extracted_winds_kmh = Column(Float, nullable=True)
    extracted_landfall_location = Column(String(256), nullable=True)
    extracted_warnings = Column(JSON, nullable=True)
    system_comparison = Column(JSON, nullable=True)
    ai_vision_model = Column(String(64), default="gemini-2.5-flash")
    uploaded_at_utc = Column(DateTime, default=datetime.datetime.utcnow)
