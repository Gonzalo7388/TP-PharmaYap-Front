export interface Cliente {
  _id: string; // ID de MongoDB
  nombre: string;
  apellido: string;
  correo_electronico: string;
  contrasena?: string; // opcional, generalmente no se expone
  dni?: string;
  telefono?: string;
  direccion?: string;
  sexo?: "masculino" | "femenino" | "otro";
  fecha_nacimiento?: string; // ISO date string
  fecha_registro: string; // ISO date string
  estado_cuenta?: "Activo" | "Inactivo";
}
