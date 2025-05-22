import { Producto } from '../../types/Producto';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

interface Props {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: string) => void;
  onView: (producto: Producto) => void;
}

export default function ProductoTable({ productos, onEdit, onDelete, onView }: Props) {
  // Eliminamos el estado local productos, porque ya lo tienes en props

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#f8e1e5]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Descripción</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Precio</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Stock</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Categoría</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Receta</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Imagen</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productos.map((producto) => (
            <tr key={producto._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">{producto.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600 line-clamp-2">{producto.descripcion}</td>
              <td className="px-6 py-4 text-sm text-gray-900">S/. {producto.precio_unitario}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{producto.stock}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {producto.categoria?.nombre || 'Sin categoría'}
              </td>
              <td className="px-6 py-4 text-sm">{producto.es_recetado ? 'Sí' : 'No'}</td>
              <td className="px-6 py-4">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEdit(producto)}
                    className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => onDelete(producto._id)}
                    className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => onView(producto)}
                    className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]"
                  >
                    <FiEye />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
