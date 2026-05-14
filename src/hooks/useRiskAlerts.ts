import { fetchRiskAlerts } from '../api/alerts';
import { mockRiskHistory } from '../mocks/mockRiskHistory';
import { RiskAlert } from '../types/risk';
import { AsyncDataState } from './types';

const shouldUseMockData = !process.env.EXPO_PUBLIC_API_BASE_URL;

export function useRiskAlerts(): AsyncDataState<RiskAlert[]> {
  if (shouldUseMockData) {
    return {
      data: mockRiskHistory,
      isLoading: false,
      error: null,
      isMock: true,
    };
  }

  void fetchRiskAlerts;

  return {
    data: mockRiskHistory,
    isLoading: false,
    error: '실제 알림 이력 API 연결은 다음 단계에서 활성화됩니다.',
    isMock: true,
  };
}
