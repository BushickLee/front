export interface Camera {
  id: string;
  name: string;
  location?: string;
  hls_url: string;
  is_active: boolean;
  last_seen_at?: string;
}
