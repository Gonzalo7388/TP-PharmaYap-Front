import React from "react";
import { Proveedor } from "../../types/Proveedor";

interface ProveedorFormModalProps {
  visible: boolean;
  proveedor: Omit<Proveedor, "id">;
  isEdit: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setNuevoProveedor(prev => ({
    ...prev,
    [name]: value,
  }));
};

const ProveedorFormModal: React.FC<ProveedorFormModalProps> = ({
  visible,
  proveedor,
  isEdit,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Cerrar formulario"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          {isEdit ? "Editar Proveedor" : "Agregar Proveedor"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="nombre"
            type="text"
            value={proveedor.nombre}
            onChange={onChange}
            placeholder="Nombre del proveedor"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
          <input
            name="telefono"
            type="text"
            value={proveedor.telefono}
            onChange={onChange}
            placeholder="Teléfono"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
          <input
            name="correo"
            type="email"
            value={proveedor.correo}
            onChange={onChange}
            placeholder="Correo electrónico"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
          <input
            name="direccion"
            type="text"
            value={proveedor.direccion}
            onChange={onChange}
            placeholder="Dirección"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
          <input
            name="ruc"
            type="text"
            value={proveedor.ruc}
            onChange={onChange}
            placeholder="RUC"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
          <select
            name="estado"
            value={proveedor.estado}
            onChange={onChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700 transition-colors"
            >
              {isEdit ? "Guardar Cambios" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProveedorFormModal;
