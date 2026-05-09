import { RiskAlert } from '../types/risk';

const fallbackHlsUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export const mockRiskAlert: RiskAlert = {
  event_id: 'evt-20260427-001',
  camera_id: 'room-01',
  frame_id: 1234,
  timestamp: '2026-04-28T23:11:35+09:00',
  phase: 'early_warning',
  phase_ko: '조기경보',
  alert_level: 'warning',
  confidence: 0.67,
  probabilities: {
    normal: 0.2,
    early_warning: 0.67,
    imminent_fall: 0.1,
    post_fall: 0.03,
  },
  guardian_message: '아이가 의자에 올라가려는 행동이 감지되었습니다.',
  hls_url: process.env.EXPO_PUBLIC_MOCK_HLS_URL ?? fallbackHlsUrl,
  thumbnail_url: 'https://example.com/thumbnails/evt-20260427-001.jpg',
};
