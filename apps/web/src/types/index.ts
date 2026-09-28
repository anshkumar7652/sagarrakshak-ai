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

export type float = number;

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
