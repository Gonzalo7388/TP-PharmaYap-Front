// src/components/Categorias/CategoriaTable.tsx
import { Categoria } from "../../types/Categoria";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

interface Props {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: string) => void;
  onView: (categoria: Categoria) => void;
}

export default function CategoriaTable({ categorias, onEdit, onDelete, onView }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#f8e1e5]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Descripción</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categorias.map((categoria) => (
            <tr key={categoria._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">{categoria.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{categoria.descripcion}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => onEdit(categoria)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"><FiEdit /></button>
                  <button onClick={() => onDelete(categoria._id)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"><FiTrash2 /></button>
                  <button onClick={() => onView(categoria)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"><FiEye /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
