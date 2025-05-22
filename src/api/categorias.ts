// src/api/categorias.ts
import axios from "./axios"; // tu instancia configurada
import { Categoria } from "../types/Categoria";

export const fetchCategorias = () => axios.get("/categorias");
export const createCategoria = (data: { nombre: string; descripcion: string }) =>
    axios.post("/categorias", data);
export const updateCategoria = (id: string, data: { nombre: string; descripcion: string }) =>
    axios.put(`${"/categorias"}/${id}`, data);
export const deleteCategoria = (id: string) => axios.delete(`${"/categorias"}/${id}`);

export const mapCategoria = (data: any): Categoria => ({
  id: data._id,
  nombre: data.nombre,
  descripcion: data.descripcion,
});
