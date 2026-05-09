export type RiskPhase = 'normal' | 'early_warning' | 'imminent_fall' | 'post_fall';

export type AlertLevel = 'normal' | 'warning' | 'critical' | 'emergency';

export type RiskProbabilities = Record<RiskPhase, number>;

export interface RiskAlert {
  event_id: string;
  camera_id: string;
  frame_id: number;
  timestamp: string;
  phase: RiskPhase;
  phase_ko: string;
  alert_level: AlertLevel;
  confidence: number;
  probabilities: RiskProbabilities;
  guardian_message: string;
  hls_url: string;
  thumbnail_url?: string;
}
