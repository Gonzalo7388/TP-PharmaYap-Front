// src/components/Trabajadores/TrabajadorFormModal.tsx
import React from 'react';
import { Usuario } from '../../types/Usuario';

interface TrabajadorFormModalProps {
  usuario: Usuario | null;
  onSave: (usuario: Usuario) => void;
  onClose: () => void;
}

const TrabajadorFormModal: React.FC<TrabajadorFormModalProps> = ({ usuario, onSave, onClose }) => {
  if (!usuario) return <div>No hay trabajador seleccionado.</div>;

  const handleSave = () => {
    onSave(usuario);
  };

  return (
    <div>
      <h2>Editar trabajador</h2>
      <form>
        {/* Formulario para editar trabajador */}
        <button type="button" onClick={handleSave}>Guardar</button>
        <button type="button" onClick={onClose}>Cerrar</button>
      </form>
    </div>
  );
};

export default TrabajadorFormModal;
