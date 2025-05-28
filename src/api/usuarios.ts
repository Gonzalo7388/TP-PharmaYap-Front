// src/api/usuarios.ts
import axios from './axios'; // Instancia de axios configurada
import { Usuario } from '../types/Usuario';

// Función para obtener usuarios por rol
export const obtenerUsuariosPorRol = async (rol: 'cliente' | 'trabajador' | 'admin'): Promise<Usuario[]> => {
  try {
    const response = await axios.get(`${'/usuarios'}/rol/${rol}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuarios con rol ${rol}`, error);
    throw error;
  }
};
// Verifica que esta función esté funcionando correctamente
export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await axios.get('/usuarios'); // Asegúrate de que esta URL sea la correcta
    console.log("Respuesta de la API:", response.data);  // Agrega un log aquí para ver la respuesta
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error); // Verifica si se muestra algún error
    throw error;
  }
};
// Crear un nuevo usuario
export const createUsuario = (data: { nombre: string; apellido: string; correo_electronico: string; contrasena: string; rol: string; }) =>
  axios.post('/usuarios', data);

// Actualizar un usuario por ID
export const updateUsuario = (id: string, data: { nombre: string; apellido: string; correo_electronico: string; contrasena: string; rol: string; }) =>
  axios.put(`${'/usuarios'}/${id}`, data);

// Eliminar un usuario por ID
export const deleteUsuario = (id: string) => axios.delete(`${'/usuarios'}/${id}`);

// Función para mapear los datos de un usuario (si es necesario)
// Mapea la respuesta de la API a un tipo Usuario
export const mapUsuario = (data: any): Usuario => ({
  id: data._id, // _id en MongoDB se mapea a id
  nombre: data.nombre,
  apellido: data.apellido,
  correo_electronico: data.correo_electronico,
  contrasena: data.contrasena,
  dni: data.dni, // Asegúrate de incluir el DNI
  telefono: data.telefono, // Asegúrate de incluir el teléfono
  fecha_nacimiento: new Date(data.fecha_nacimiento), // Convierte la fecha de nacimiento a un objeto Date
  genero: data.genero, // Incluye el género
  fecha_registro: new Date(data.fecha_registro), // Convierte la fecha de registro a un objeto Date
  estado_cuenta: data.estado_cuenta, // El estado de cuenta
  rol: data.rol, // El rol del usuario (cliente, trabajador, admin)
});