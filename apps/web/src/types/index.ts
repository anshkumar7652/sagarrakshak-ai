export type float = number;

export interface TrackPoint {
  timestamp: string;
  lat: float;
  lon: float;
  wind_kmh: number;
  pressure_hpa: number;
  category: string;
  cone_radius_km: number;
  stage: string;
}

export interface CycloneTrack {
  cyclone_id: string;
  name: string;
  basin: string;
  category: string;
  max_wind_kmh: number;
  min_pressure_hpa: number;
  landfall_location: string;
  landfall_time: string;
  source: string;
  track_points: TrackPoint[];
}

export interface AlternativeFacility {
  id: string;
  name: string;
  distance_km: number;
}

export interface AssetRiskAssessment {
  asset_id: string;
  name: string;
  type: 'hospital' | 'shelter' | 'power_substation' | 'arterial_road' | string;
  district: string;
  coordinates: [number, number]; // [lon, lat]
  elevation_m: number;
  criticality: string;
  population_served: number;
  hazard_score: number;
  exposure_score: number;
  vulnerability_score: number;
  composite_risk_score: number;
  hazard_breakdown: {
    wind: number;
    rainfall: number;
    inundation: number;
    composite: number;
  };
  access_road_status: 'CLEAR' | 'CAUTION' | 'HIGH_RISK' | 'IMPASSIBLE' | string;
  nearest_alternative?: AlternativeFacility | null;
  risk_rank: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  recommended_action: string;
  explanation: string;
}

export interface DistrictRiskSummary {
  district_id: string;
  district_name: string;
  state: string;
  composite_risk_score: number;
  population_exposed: number;
  critical_assets_at_risk: number;
  primary_threat: string;
  recommended_district_action: string;
}

export interface AnalysisRunResponse {
  analysis_id: string;
  scenario_id: string;
  inundation_scenario: 'low' | 'base' | 'high';
  cyclone_name: string;
  current_time_step: string;
  cyclone_state: TrackPoint;
  district_summaries: DistrictRiskSummary[];
  top_threatened_assets: AssetRiskAssessment[];
  total_population_at_risk: number;
  high_risk_roads_count: number;
  confidence_level: string;
  data_freshness_utc: string;
  disclaimer: string;
  geojson_layers: {
    infrastructure: any;
    inundation_screening: any;
  };
}

export interface PriorityAction {
  asset_id: string;
  target_name: string;
  asset_type: string;
  action: string;
  urgency: 'IMMEDIATE' | 'NEXT_3_HOURS' | 'STANDBY';
  evidence_ids: string[];
}

export interface PublicAlerts {
  en: string;
  hi: string;
  or: string;
  sms_version: string;
}

export interface GroundedAdvisory {
  advisory_id: string;
  analysis_id: string;
  timestamp_utc: string;
  situation_summary: string;
  priority_actions: PriorityAction[];
  public_alerts: PublicAlerts;
  uncertainties: string[];
  approval_required: boolean;
  official_source_link: string;
}

export interface DispatchReceipt {
  receipt_id: string;
  advisory_id: string;
  status: string;
  approved_by: string;
  deoc_center: string;
  dispatched_at_utc: string;
  dispatch_channels: string[];
  evidence_trail: string[];
  audit_hash: string;
}

// Enterprise Registry & Audit Types
export interface CriticalAssetRecord {
  id: number;
  asset_id: string;
  name: string;
  type: 'hospital' | 'shelter' | 'power_substation' | 'arterial_road' | string;
  district: string;
  subdistrict?: string | null;
  criticality: string;
  lat: number;
  lon: number;
  elevation_m: number;
  population_served: number;
  capacity_beds?: number | null;
  capacity_persons?: number | null;
  backup_power: boolean;
  alternative_name?: string | null;
  alternative_dist_km?: number | null;
  source: string;
  verification_status: string;
}

export interface AssetStats {
  total_assets: number;
  by_type: Record<string, number>;
  by_district: Record<string, number>;
  by_criticality: Record<string, number>;
  backup_power_rate_percent: number;
  total_population_served: number;
  total_shelter_capacity: number;
  total_hospital_beds: number;
}

export interface AuditLogItem {
  receipt_id: string;
  advisory_id: string;
  officer_name: string;
  officer_id: string;
  deoc_center: string;
  approved_text_en: string;
  approved_text_hi: string;
  approved_text_or: string;
  dispatch_channels: string[];
  audit_hash: string;
  has_cap_xml: boolean;
  dispatched_at_utc: string;
}

export interface VerificationResult {
  receipt_id: string;
  is_valid: boolean;
  computed_hash: string;
  recorded_hash: string;
  officer_signature: string;
  timestamp: string;
  tamper_evident_status: string;
}

export interface BulletinSample {
  sample_id: string;
  title: string;
  source: string;
  cyclone_name: string;
  bulletin_no: string;
  preview_url: string;
  description: string;
  preset_extracted: Record<string, any>;
}

export interface BulletinExtractionResult {
  upload_id: string;
  filename: string;
  bulletin_no: string;
  system_name: string;
  stage: string;
  date_time_utc: string;
  center_lat: number;
  center_lon: number;
  max_wind_kmh: number;
  central_pressure_hpa: number;
  landfall_location: string;
  landfall_eta: string;
  storm_surge_m: number;
  red_alert_districts: string[];
  orange_alert_districts: string[];
  vision_model_used: string;
  confidence_score: number;
  system_comparison: Record<string, any>;
  raw_ai_summary: string;
}

export interface CycloneComparisonItem {
  cyclone_name: string;
  year: number;
  category: string;
  peak_wind_kmh: number;
  min_pressure_hpa: number;
  storm_surge_m: number;
  landfall_region: string;
  people_evacuated: number;
  critical_facilities_threatened: number;
  grid_restoration_days: number;
  human_loss_mitigation_rate: string;
}

export interface DistrictRiskProfile {
  district: string;
  state: string;
  coastal_length_km: number;
  population_at_risk: number;
  elevation_median_m: number;
  multi_hazard_vulnerability_index: number;
  cyclone_shelters_count: number;
  hospital_bed_capacity: number;
  backup_power_ready_pct: number;
  primary_evacuation_corridor: string;
}
