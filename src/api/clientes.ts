// src/api/clientes.ts
import axios from './axios';
import type { Cliente } from '../types/Cliente';

export const getClientes = async (): Promise<Cliente[]> => {
  const res = await axios.get('/clientes');
  return res.data;
};

export const createCliente = async (clienteData: Omit<Cliente, 'id_usuario'>): Promise<Cliente> => {
  const res = await axios.post('/clientes', clienteData);
  return res.data;
};

export const updateCliente = async (id: string, clienteData: Partial<Cliente>): Promise<Cliente> => {
  const res = await axios.put(`/clientes/${id}`, clienteData);
  return res.data;
};

export const deleteCliente = async (id: string): Promise<void> => {
  await axios.delete(`/clientes/${id}`);
};
