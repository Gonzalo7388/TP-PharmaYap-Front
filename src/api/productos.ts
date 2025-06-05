// src/api/productos.ts
import axios from './axios';

export const getProductos = async () => {
  const res = await axios.get('/productos');
  return res.data;
};

export const createProducto = async (productoData: any) => {
  const res = await axios.post('/productos', productoData);
  return res.data;
};

export const updateProducto = async (id: string, productoData: any) => {
  const res = await axios.put(`/productos/${id}`, productoData);
  return res.data;
};

export const deleteProducto = async (id: string) => {
  const res = await axios.delete(`/productos/${id}`);
  return res.data;
};
