import { fetchStreamInfo } from '../api/stream';
import { mockStreamInfo } from '../mocks/mockStreamInfo';
import { StreamInfo } from '../types/stream';
import { AsyncDataState } from './types';

const shouldUseMockData = !process.env.EXPO_PUBLIC_API_BASE_URL;

export function useStreamInfo(): AsyncDataState<StreamInfo> {
  if (shouldUseMockData) {
    return {
      data: mockStreamInfo,
      isLoading: false,
      error: null,
      isMock: true,
    };
  }

  void fetchStreamInfo;

  return {
    data: mockStreamInfo,
    isLoading: false,
    error: '실제 스트림 API 연결은 다음 단계에서 활성화됩니다.',
    isMock: true,
  };
}
