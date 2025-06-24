import { Pedido } from "../../types/Pedido";

interface Props {
    pedido: Pedido;
    onClose: () => void;
    onChange: (pedido: Pedido) => void;
    onSave: () => void;
    loading: boolean;
}

export default function PedidoFormModal({
    pedido,
    onClose,
    onChange,
    onSave,
    loading,
}: Props) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const keys = name.split(".");
        if (keys.length === 2) {
            const [parent, child] = keys;
            const parentValue = pedido[parent as keyof Pedido] as Record<string, any>;
            onChange({
                ...pedido,
                [parent]: {
                    ...parentValue,
                    [child]: value,
                },
            });
        } else {
            onChange({
                ...pedido,
                [name]: value,
            });
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">
                    {pedido._id ? "Editar Pedido" : "Nuevo Pedido"}
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!loading) onSave();
                    }}
                >
                    {[
                        { label: "Dirección", name: "direccion_entrega" },
                        { label: "Fecha", name: "fecha_pedido", type: "date" },
                    ].map(({ label, name, type = "text" }) => (
                        <div key={name}>
                            <label className="block mb-2 font-semibold text-gray-700">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={
                                    name.includes(".")
                                        ? String(
                                              name
                                                  .split(".")
                                                  .reduce((acc: any, key) => acc?.[key], pedido) ?? ""
                                          )
                                        : String((pedido as any)[name] ?? "")
                                }
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                required
                                disabled={loading}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Estado</label>
                        <select
                            name="estado"
                            value={pedido.estado}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 mb-4"
                            disabled={loading}
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="en camino">En camino</option>
                            <option value="entregado">Entregado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700 flex items-center justify-center ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Guardando...
                                </>
                            ) : (
                                "Guardar"
                            )}
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    disabled={loading}
                    className={`absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    aria-label="Cerrar modal"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
