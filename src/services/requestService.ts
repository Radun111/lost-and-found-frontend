// src/services/requestService.ts
import api from './api';
import { Request } from '../types/request';

export const fetchRequests = async (): Promise<Request[]> => {
  const response = await api.get('/requests');
  return response.data;
};

export const updateRequestStatus = async (
  id: string, 
  status: 'APPROVED' | 'REJECTED'
): Promise<Request> => {
  const response = await api.patch(`/requests/${id}`, { status });
  return response.data;
};