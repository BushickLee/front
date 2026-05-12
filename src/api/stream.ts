import { apiClient } from './client';
import { StreamInfo } from '../types/stream';

export function fetchStreamInfo() {
  return apiClient<StreamInfo>('/stream');
}
