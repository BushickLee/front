declare const process: {
  env?: {
    EXPO_PUBLIC_API_BASE_URL?: string;
  };
};

export const API_BASE_URL = process.env?.EXPO_PUBLIC_API_BASE_URL ?? '';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError('EXPO_PUBLIC_API_BASE_URL is not configured.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.status}`, response.status);
  }

  return response.json() as Promise<T>;
}
