// src/api/principiosActivos.ts

import api from './axios';
import { PrincipioActivo } from '../types/PrincipioActivo';

const ENDPOINT = '/principioActivos';

export const getPrincipiosActivos = async (): Promise<PrincipioActivo[]> => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

export const createPrincipioActivo = async (data: Partial<PrincipioActivo>): Promise<PrincipioActivo> => {
  const response = await api.post(ENDPOINT, data);
  return response.data;
};

export const updatePrincipioActivo = async (id: string, data: Partial<PrincipioActivo>): Promise<PrincipioActivo> => {
  const response = await api.put(`${ENDPOINT}/${id}`, data);
  return response.data;
};

export const deletePrincipioActivo = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`);
};
