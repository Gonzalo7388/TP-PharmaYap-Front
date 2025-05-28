import React, { useState } from "react";
import { FiTruck } from "react-icons/fi";
import { useProveedores } from "../../hooks/useProveedores";
import ExportButtons from "./ExportButtons";
import DragAndDropUploader from "./DragAndDropUploader";
import ProveedorFormModal from "./ProveedorFormModal";
import ProveedorTable from "./ProveedorTable";

const ProveedoresContainer = () => {
    const {
        mensaje,
        search,
        setSearch,
        proveedoresFiltrados,
        agregarProveedor,
        eliminarProveedor,
        editarProveedor,
        nuevoProveedor,
        setNuevoProveedor,
        editId,
        limpiarFormulario,
        inputFileRef,
    } = useProveedores();

    const [showForm, setShowForm] = useState(false);

    // Aquí defines la función handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoProveedor(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                <FiTruck className="mr-3" style={{ color: "#ca5c71", fontSize: "1.875rem" }} />
                Gestión de Proveedores
            </h1>

            {mensaje && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                    {mensaje}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <input
                    type="text"
                    placeholder="Buscar por nombre, correo o RUC..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 max-w-sm w-full"
                />

                <div className="flex space-x-2">
                    {/* Botón para abrir formulario */}
                    <button
                        onClick={() => {
                            limpiarFormulario();
                            setShowForm(true);
                        }}
                        className="bg-[#ca5c71] text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                    >
                        Agregar Proveedor
                    </button>

                    {/* Botones de exportación */}
                    <ExportButtons
                        proveedores={proveedoresFiltrados}
                        onExportarCSV={(data) => {
                            // Aquí agregas tu lógica para exportar CSV
                            console.log("Exportar CSV", data);
                        }}
                        onExportarPDF={() => {
                            // Aquí agregas tu lógica para exportar PDF
                            console.log("Exportar PDF");
                        }}
                    />
                </div>
            </div>


            <DragAndDropUploader
                onFileUpload={(file) => {
                    // lógica para manejar el archivo
                }}
            />

            {showForm && (
                <ProveedorFormModal
                    proveedor={nuevoProveedor}
                    onChange={handleChange}
                    onClose={() => setShowForm(false)}  // Cambiar onCancel a onClose
                    onSubmit={(e) => {
                        e.preventDefault();
                        agregarProveedor();
                        setShowForm(false);
                    }}
                    visible={showForm}
                    isEdit={!!editId}
                />

            )}
            <ProveedorTable
                proveedores={proveedoresFiltrados}
                onEdit={editarProveedor}
                onDelete={eliminarProveedor}
            />
        </div>
    );
};

export default ProveedoresContainer;
