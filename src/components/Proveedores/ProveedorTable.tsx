import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Proveedor } from "../../types/Proveedor";

interface ProveedorTableProps {
  proveedores: Proveedor[];
  onEdit: (proveedor: Proveedor) => void;
  onDelete: (id: number) => void;
}

const ProveedorTable: React.FC<ProveedorTableProps> = ({ proveedores, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse text-left text-sm text-gray-500">
        <thead className="bg-[#ca5c71] text-white">
          <tr>
            <th className="px-6 py-4 font-medium">Nombre</th>
            <th className="px-6 py-4 font-medium">Teléfono</th>
            <th className="px-6 py-4 font-medium">Correo</th>
            <th className="px-6 py-4 font-medium">Dirección</th>
            <th className="px-6 py-4 font-medium">RUC</th>
            <th className="px-6 py-4 font-medium">Estado</th>
            <th className="px-6 py-4 font-medium text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {proveedores.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                No hay proveedores que mostrar.
              </td>
            </tr>
          ) : (
            proveedores.map((proveedor) => (
              <tr key={proveedor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-700">{proveedor.nombre}</td>
                <td className="px-6 py-4">{proveedor.telefono}</td>
                <td className="px-6 py-4">{proveedor.correo}</td>
                <td className="px-6 py-4">{proveedor.direccion}</td>
                <td className="px-6 py-4">{proveedor.ruc}</td>
                <td className="px-6 py-4">{proveedor.estado}</td>
                <td className="px-6 py-4 flex justify-center space-x-4">
                  <button onClick={() => onEdit(proveedor)} className="text-blue-600 hover:text-blue-800">
                    <FiEdit />
                  </button>
                  <button onClick={() => onDelete(proveedor.id)} className="text-red-600 hover:text-red-800">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedorTable;
