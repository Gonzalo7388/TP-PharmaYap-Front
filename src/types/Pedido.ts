// src/types/Pedido.ts
import { Cliente } from "./Cliente";
import { Usuario } from "./Usuario";

export interface Pedido {
  _id: string;
  cliente: Cliente; // Cliente ya definido en tu tipo
  repartidor?: Pick<Usuario, "_id" | "nombre" | "apellido"> | null; // extraemos solo lo necesario
  fecha_pedido: string; // ISO string
  estado: 'pendiente' | 'en camino' | 'entregado' | 'cancelado';
  metodo_pago?: string;
  total_pedido: number;
  direccion_entrega: string;
  historial_estado: {
    estado: string;
    fecha: string; // ISO string
    cambiado_por: string | null; // posiblemente ID de usuario
  }[];
}
