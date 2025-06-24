// src/types/Usuario.ts
export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  correo_electronico: string;
  contrasena: string;
  dni: string;
  telefono: string;
  fecha_nacimiento: Date;
  genero: string;
  fecha_registro: Date;
  estado_cuenta: 'activo' | 'inactivo';
  rol: 'cliente' | 'trabajador' | 'admin';
}
