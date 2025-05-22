// src/api/productos.ts
import axios from './axios';

export const getProductos = async () => {
  const res = await axios.get('/productos');
  return res.data;
};
