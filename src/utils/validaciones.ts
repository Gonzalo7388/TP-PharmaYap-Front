// utils/validaciones.ts
export const soloLetras = (valor: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
export const descripcionValida = (valor: string) => /^[\w\sáéíóúÁÉÍÓÚñÑ.,()"'¡!¿?/-]*$/.test(valor);
