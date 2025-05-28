// src/components/Trabajadores/TrabajadorActions.tsx
import React from 'react';
import { Usuario } from '../../types/Usuario';

interface TrabajadorActionsProps {
  trabajador: Usuario;
  onEdit: (trabajador: Usuario) => void;
  onDelete: (id: string) => void;
}

const TrabajadorActions: React.FC<TrabajadorActionsProps> = ({ trabajador, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(trabajador);
  };

  const handleDelete = () => {
    onDelete(trabajador.id);
  };

  return (
    <div>
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default TrabajadorActions;
