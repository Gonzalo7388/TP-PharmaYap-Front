// src/hooks/useUsuarios.ts

import { useState, useEffect } from 'react';
import { Usuario } from '../types/Usuario';
import { obtenerUsuarios, agregarUsuario, editarUsuario, eliminarUsuario } from '../api/usuarios'; // Asume que estos métodos existen en la API

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      setLoading(true);
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        setError('No se pudo cargar la lista de usuarios');
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  const agregar = async (usuario: Usuario) => {
    try {
      const nuevoUsuario = await agregarUsuario(usuario);
      setUsuarios((prev) => [...prev, nuevoUsuario]);
    } catch (error) {
      setError('Error al agregar usuario');
    }
  };

  // Cambiar id de number a string
  const editar = async (id: string, usuario: Usuario) => {  // id es de tipo string
    try {
      const usuarioEditado = await editarUsuario(id, usuario); // Pasar id como string
      setUsuarios((prev) =>
        prev.map((u) => (u._id === id ? usuarioEditado : u))  // Asegurarse de usar _id, no id
      );
    } catch (error) {
      setError('Error al editar usuario');
    }
  };

  // Cambiar id de number a string
  const eliminar = async (id: string) => {  // id es de tipo string
    try {
      await eliminarUsuario(id);  // Pasar id como string
      setUsuarios((prev) => prev.filter((u) => u._id !== id));  // Asegurarse de usar _id, no id
    } catch (error) {
      setError('Error al eliminar usuario');
    }
  };

  return {
    usuarios,
    loading,
    error,
    agregar,
    editar,
    eliminar,
  };
};
