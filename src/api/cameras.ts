import { apiClient } from './client';
import { Camera } from '../types/camera';

export function fetchCameras() {
  return apiClient<Camera[]>('/cameras');
}

export function fetchCamera(cameraId: string) {
  return apiClient<Camera>(`/cameras/${cameraId}`);
}
