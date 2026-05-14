import { fetchRiskAlert } from '../api/alerts';
import { mockRiskHistory } from '../mocks/mockRiskHistory';
import { RiskAlert } from '../types/risk';
import { AsyncDataState } from './types';

const shouldUseMockData = !process.env.EXPO_PUBLIC_API_BASE_URL;

export function useRiskAlertDetail(eventId: string): AsyncDataState<RiskAlert> {
  const alert = mockRiskHistory.find((item) => item.event_id === eventId) ?? null;

  if (shouldUseMockData) {
    return {
      data: alert,
      isLoading: false,
      error: alert ? null : '알림 상세를 찾을 수 없습니다.',
      isMock: true,
    };
  }

  void fetchRiskAlert;

  return {
    data: alert,
    isLoading: false,
    error: '실제 알림 상세 API 연결은 다음 단계에서 활성화됩니다.',
    isMock: true,
  };
}
