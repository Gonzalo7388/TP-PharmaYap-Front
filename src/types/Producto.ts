// src/types/Producto.ts
import { Categoria } from './Categoria';

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio_unitario: number;
  stock: number;
  stock_minimo: number;
  unidad_medida: string;
  imagen: string;
  registro_sanitario: string;
  fecha_vencimiento: string;
  es_recetado: boolean;
  categoria: Categoria; // Esto es importante para mostrar el nombre
  createdAt: string;
  updatedAt: string;
}
