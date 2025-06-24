"use client";

import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

import ClienteTable from "../components/Clientes/ClienteTable";
import ClienteFormModal from "../components/Clientes/ClienteFormModal";
import ClienteViewModal from "../components/Clientes/ClienteViewModal";

import type { Cliente } from "../types/Cliente";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../api/clientes";

export default function ClientePage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editCliente, setEditCliente] = useState<Cliente | null>(null);
  const [nuevoCliente, setNuevoCliente] = useState<Cliente | null>(null);
  const [clienteVisualizar, setClienteVisualizar] = useState<Cliente | null>(null);

  // Carga inicial desde API
  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (cliente: Cliente) => setEditCliente(cliente);

  const handleView = (cliente: Cliente) => setClienteVisualizar(cliente);

  const handleSave = async (cliente: Cliente, isNew: boolean) => {
    try {
      if (isNew) {
        const creado = await createCliente(cliente);
        setClientes((prev) => [...prev, creado]);
      } else {
        if (!cliente._id) throw new Error("Cliente no tiene ID");
        const actualizado = await updateCliente(cliente._id, cliente);
        setClientes((prev) => prev.map((c) => (c._id === actualizado._id ? actualizado : c)));
      }
      setEditCliente(null);
      setNuevoCliente(null);
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await deleteCliente(id);
        setClientes((prev) => prev.filter((c) => c._id !== id));
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };

  const toggleEstado = (id: string) => {
    setClientes((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, estado_cuenta: c.estado_cuenta === "Activo" ? "Inactivo" : "Activo" }
          : c,
      ),
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Clientes</h1>
        <button
          onClick={() =>
            setNuevoCliente({
              nombre: "",
              apellido: "",
              correo_electronico: "",
              telefono: "",
              direccion: "",
              sexo: "masculino",
              dni: "",
              fecha_registro: new Date().toISOString(),
              // Puedes agregar más campos si los tienes definidos
            } as Cliente)
          }
          className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
        >
          <FiPlus className="mr-2" /> Nuevo Cliente
        </button>
      </div>

      <ClienteTable
        clientes={clientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onToggleEstado={toggleEstado}
      />

      {(editCliente || nuevoCliente) && (
        <ClienteFormModal
          cliente={editCliente || nuevoCliente!}
          onClose={() => {
            setEditCliente(null);
            setNuevoCliente(null);
          }}
          onSave={handleSave}
          isNew={!editCliente}
        />
      )}

      {clienteVisualizar && (
        <ClienteViewModal cliente={clienteVisualizar} onClose={() => setClienteVisualizar(null)} />
      )}
    </>
  );
}
