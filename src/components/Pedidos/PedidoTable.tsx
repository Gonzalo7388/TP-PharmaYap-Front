// src/components/Pedidos/PedidoTable.tsx
import { Pedido } from "../../types/Pedido";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

interface Props {
  pedidos: Pedido[];
  onEdit: (pedido: Pedido) => void;
  onDelete: (id: string) => void;
  onView: (pedido: Pedido) => void;
}

export default function PedidoTable({ pedidos, onEdit, onDelete, onView }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto mb-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#f8e1e5]">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Cliente</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Repartidor</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Fecha</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Estado</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Total</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-[#ca5c71] uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pedidos.map((pedido) => (
            <tr key={pedido._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                {pedido.cliente?.nombre} {pedido.cliente?.apellido}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {pedido.repartidor
                  ? `${pedido.repartidor.nombre} ${pedido.repartidor.apellido}`
                  : "Sin asignar"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(pedido.fecha_pedido).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm capitalize font-medium text-gray-700">{pedido.estado}</td>
              <td className="px-6 py-4 text-sm text-gray-800">S/ {pedido.total_pedido.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-3">
                  <button onClick={() => onEdit(pedido)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                    <FiEdit />
                  </button>
                  <button onClick={() => onDelete(pedido._id)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
                    <FiTrash2 />
                  </button>
                  <button onClick={() => onView(pedido)} className="text-[#ca5c71] hover:text-pink-700 p-1.5 rounded-lg hover:bg-[#f8e1e5]">
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
