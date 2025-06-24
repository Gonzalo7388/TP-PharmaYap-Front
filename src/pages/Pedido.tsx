import { useEffect, useState } from "react";
import {
    fetchPedidos,
    createPedido,
    updatePedido,
    deletePedido as deletePedidoAPI,
} from "../api/pedidos";

import PedidoTable from "../components/Pedidos/PedidoTable";
import PedidoViewModal from "../components/Pedidos/PedidoViewModal";
import PedidoFormModal from "../components/Pedidos/PedidoFormModal";

import { Pedido } from "../types/Pedido";
import { FiPlus } from "react-icons/fi";

export default function PedidoPage() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [pedidoVisualizar, setPedidoVisualizar] = useState<Pedido | null>(null);
    const [editPedido, setEditPedido] = useState<Pedido | null>(null);
    const [nuevoPedido, setNuevoPedido] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPedidos()
            .then((res) => setPedidos(res.data))
            .catch((err) => console.error("Error cargando pedidos:", err));
    }, []);

    const handleAddNuevo = () => {
        if (nuevoPedido) {
            setLoading(true);
            createPedido(nuevoPedido)
                .then((res) => {
                    setPedidos((prev) => [...prev, res.data]);
                    setNuevoPedido(null);
                })
                .catch(() => alert("Error al agregar pedido"))
                .finally(() => setLoading(false));
        }
    };

    const handleSaveEdit = () => {
        if (editPedido) {
            setLoading(true);
            updatePedido(editPedido._id, editPedido)
                .then(() => {
                    setPedidos((prev) =>
                        prev.map((p) => (p._id === editPedido._id ? editPedido : p))
                    );
                    setEditPedido(null);
                })
                .catch(() => alert("Error al actualizar pedido"))
                .finally(() => setLoading(false));
        }
    };

    const eliminarPedido = (id: string) => {
        if (window.confirm("¿Eliminar pedido?")) {
            deletePedidoAPI(id)
                .then(() => setPedidos((prev) => prev.filter((p) => p._id !== id)))
                .catch(() => alert("Error al eliminar pedido"));
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Pedidos</h1>
                <button
                    onClick={() =>
                        setNuevoPedido({
                            _id: "",
                            cliente: {
                                _id: "",
                                nombre: "",
                                apellido: "",
                                dni: "",
                                telefono: "",
                                correo_electronico: "",
                                fecha_registro: new Date().toISOString(), // o ""
                            },
                            fecha_pedido: new Date().toISOString().split("T")[0],
                            estado: "pendiente",
                            metodo_pago: "",
                            total_pedido: 0,
                            direccion_entrega: "",
                            historial_estado: [],
                            repartidor: null,
                        })
                    }
                    disabled={loading}
                    className={`bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <FiPlus className="mr-2" /> Nuevo Pedido
                </button>
            </div>

            <PedidoTable
                pedidos={pedidos}
                onEdit={setEditPedido}
                onDelete={eliminarPedido}
                onView={setPedidoVisualizar}
            />

            {(editPedido || nuevoPedido) && (
                <PedidoFormModal
                    pedido={(editPedido || nuevoPedido) as Pedido}
                    onClose={() => {
                        setEditPedido(null);
                        setNuevoPedido(null);
                    }}
                    onChange={(p) =>
                        editPedido ? setEditPedido(p) : setNuevoPedido(p)
                    }
                    onSave={editPedido ? handleSaveEdit : handleAddNuevo}
                    loading={loading}
                />
            )}

            {pedidoVisualizar && (
                <PedidoViewModal
                    pedido={pedidoVisualizar}
                    onClose={() => setPedidoVisualizar(null)}
                />
            )}
        </>
    );
}
