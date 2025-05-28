// src/components/Trabajadores/TrabajadorTable.tsx

import React from 'react';
import { Usuario } from '../../types/Usuario';

interface Props {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void; // Cambiar a 'string'
}

export const TrabajadorTable: React.FC<Props> = ({ usuarios, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios
          .filter((usuario) => usuario.rol === 'trabajador') // Filtrar solo trabajadores
          .map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre} {usuario.apellido}</td>
              <td>{usuario.correo_electronico}</td>
              <td>{usuario.rol}</td>
              <td>
                {usuario.rol === 'trabajador' && (
                  <button onClick={() => onEdit(usuario)}>Editar</button>
                )}
                <button onClick={() => onDelete(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

