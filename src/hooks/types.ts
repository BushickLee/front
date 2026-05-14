export interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isMock: boolean;
}
