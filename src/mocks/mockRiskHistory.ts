import { RiskAlert } from '../types/risk';
import { mockRiskAlert } from './mockRiskAlert';

export const mockRiskHistory: RiskAlert[] = [
  mockRiskAlert,
  {
    ...mockRiskAlert,
    event_id: 'evt-20260427-002',
    frame_id: 1450,
    timestamp: '2026-04-28T22:48:12+09:00',
    phase: 'imminent_fall',
    phase_ko: '낙상 임박',
    alert_level: 'critical',
    confidence: 0.86,
    probabilities: {
      normal: 0.04,
      early_warning: 0.08,
      imminent_fall: 0.86,
      post_fall: 0.02,
    },
    guardian_message: '아이가 의자 가장자리에서 균형을 잃을 가능성이 높습니다.',
  },
  {
    ...mockRiskAlert,
    event_id: 'evt-20260427-003',
    frame_id: 980,
    timestamp: '2026-04-28T21:17:40+09:00',
    phase: 'normal',
    phase_ko: '정상',
    alert_level: 'normal',
    confidence: 0.91,
    probabilities: {
      normal: 0.91,
      early_warning: 0.06,
      imminent_fall: 0.02,
      post_fall: 0.01,
    },
    guardian_message: '아이방에서 안정적인 활동이 감지되었습니다.',
  },
];
