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
    object_type: 'chair',
    object_type_ko: '의자',
    guardian_message: '아이가 의자의 가장자리에서 낙상 임박이 일어났습니다.',
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
    object_type: 'sofa',
    object_type_ko: '소파',
    guardian_message: '아이가 소파 주변에서 정상 상태로 감지되었습니다.',
  },
];
