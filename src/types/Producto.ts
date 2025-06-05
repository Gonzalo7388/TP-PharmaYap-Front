// src/types/Producto.ts
import { Categoria } from './Categoria';
import { PrincipioActivo } from './PrincipioActivo';

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
  categoria: Categoria; // objeto categoría
  principio_activo: PrincipioActivo | string; // puede ser solo id o objeto
  createdAt: string;
  updatedAt: string;
}
