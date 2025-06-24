import axios from "./axios";
import { Pedido } from "../types/Pedido";

// Obtener todos los pedidos
export const fetchPedidos = () => axios.get("/pedidos");

// Obtener un pedido por ID
export const fetchPedidoPorId = (id: string) =>
    axios.get(`/pedidos/${id}`);

// Crear un nuevo pedido
export const createPedido = (data: Pedido) =>
    axios.post("/pedidos", data);

// Actualizar pedido (puede incluir cambio de estado)
export const updatePedido = (id: string, data: Partial<Pedido>) =>
    axios.put(`/pedidos/${id}`, data);

// Eliminar pedido
export const deletePedido = (id: string) =>
    axios.delete(`/pedidos/${id}`);

// Mapear datos crudos a tipo Pedido (útil si quieres transformar antes de renderizar)
export const mapPedido = (data: any): Pedido => ({
    _id: data._id,
    cliente: {
        _id: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        correo_electronico: "",
        fecha_registro: new Date().toISOString(), // o ""
    },

    repartidor: data.repartidor
        ? {
            _id: data.repartidor._id,
            nombre: data.repartidor.nombre,
            apellido: data.repartidor.apellido,
        }
        : null,
    fecha_pedido: data.fecha_pedido,
    estado: data.estado,
    metodo_pago: data.metodo_pago,
    total_pedido: data.total_pedido,
    direccion_entrega: data.direccion_entrega,
    historial_estado: data.historial_estado || [],
});
