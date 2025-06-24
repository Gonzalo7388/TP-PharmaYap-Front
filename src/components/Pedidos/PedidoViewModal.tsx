// src/components/Pedidos/PedidoViewModal.tsx
import { Pedido } from "../../types/Pedido";

interface Props {
  pedido: Pedido;
  onClose: () => void;
}

export default function PedidoViewModal({ pedido, onClose }: Props) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Detalles del Pedido</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p><strong>ID:</strong> {pedido._id}</p>
          <p><strong>Cliente:</strong> {pedido.cliente?.nombre} {pedido.cliente?.apellido}</p>
          <p><strong>Repartidor:</strong> {pedido.repartidor ? `${pedido.repartidor.nombre} ${pedido.repartidor.apellido}` : "Sin asignar"}</p>
          <p><strong>Fecha del Pedido:</strong> {new Date(pedido.fecha_pedido).toLocaleString()}</p>
          <p><strong>Estado Actual:</strong> {pedido.estado}</p>
          <p><strong>Método de Pago:</strong> {pedido.metodo_pago || "No especificado"}</p>
          <p><strong>Total del Pedido:</strong> S/ {pedido.total_pedido.toFixed(2)}</p>
          <p><strong>Dirección de Entrega:</strong> {pedido.direccion_entrega}</p>

          <div>
            <strong>Historial de Estados:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              {pedido.historial_estado.map((h, index) => (
                <li key={index}>
                  <span className="font-medium capitalize">{h.estado}</span> – {new Date(h.fecha).toLocaleString()} 
                  {h.cambiado_por && ` (Modificado por: ${h.cambiado_por})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
