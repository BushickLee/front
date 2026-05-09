import { apiClient } from './client';
import { RiskAlert } from '../types/risk';

export function fetchRiskAlerts() {
  return apiClient<RiskAlert[]>('/alerts');
}

export function fetchRiskAlert(eventId: string) {
  return apiClient<RiskAlert>(`/alerts/${eventId}`);
}

export function registerPushToken(token: string) {
  return apiClient<{ ok: boolean }>('/push-tokens', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}
