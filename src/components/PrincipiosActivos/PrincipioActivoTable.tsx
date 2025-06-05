import { PrincipioActivo } from '../../types/PrincipioActivo';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface Props {
  data: PrincipioActivo[];
  onEdit: (item: PrincipioActivo) => void;
  onDelete: (id: string) => void;
}

export default function PrincipioActivoTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#f8e1e5]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Descripción</th>
            <th className="px-6 py-4 text-center text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No hay principios activos registrados.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600 line-clamp-2">{item.descripcion || '—'}</td>
                <td className="px-6 py-4 text-sm font-medium text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item._id!)}
                      className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
