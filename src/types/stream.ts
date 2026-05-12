export interface StreamInfo {
  camera_name: string;
  camera_location: string;
  hls_url: string;
  is_active: boolean;
  last_seen_at?: string;
}
