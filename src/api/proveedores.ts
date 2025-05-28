import axios from "./axios";
import { Proveedor } from "../types/Proveedor";

export const getProveedores = () => axios.get<Proveedor[]>("/proveedores");
export const createProveedor = (data: Omit<Proveedor, "id">) => axios.post("/proveedores", data);
export const updateProveedor = (id: number, data: Partial<Proveedor>) => axios.put(`/proveedores/${id}`, data);
export const deleteProveedor = (id: number) => axios.delete(`/proveedores/${id}`);
