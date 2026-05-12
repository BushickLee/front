import { StreamInfo } from '../types/stream';

const fallbackHlsUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export const mockStreamInfo: StreamInfo = {
  camera_name: '아이방 카메라',
  camera_location: '아이방',
  hls_url: process.env.EXPO_PUBLIC_MOCK_HLS_URL ?? fallbackHlsUrl,
  is_active: true,
  last_seen_at: '2026-05-12T14:32:15+09:00',
};
