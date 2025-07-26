import axios from 'axios';
import { ApiRequest, ApiResponse, HealthResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatApi = {
  async askQuestion(request: ApiRequest): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/ask', request);
    return response.data;
  },

  async getHealth(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  },
};

export default api; 