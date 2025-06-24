"use client"

import type { Cliente } from "../../types/Cliente"

interface ClienteViewModalProps {
  cliente: Cliente
  onClose: () => void
}

export default function ClienteViewModal({ cliente, onClose }: ClienteViewModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Detalles del Cliente</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              {cliente.nombre} {cliente.apellido}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Estado:</div>
              <div className={`font-medium ${cliente.estado_cuenta === "Activo" ? "text-green-600" : "text-red-600"}`}>
                {cliente.estado_cuenta ?? "Desconocido"}
              </div>

              <div className="text-gray-500">Correo:</div>
              <div>{cliente.correo_electronico}</div>

              <div className="text-gray-500">DNI:</div>
              <div>{cliente.dni ?? "-"}</div>

              <div className="text-gray-500">Teléfono:</div>
              <div>{cliente.telefono ?? "-"}</div>

              <div className="text-gray-500">Dirección:</div>
              <div>{cliente.direccion ?? "-"}</div>

              <div className="text-gray-500">Fecha de Nacimiento:</div>
              <div>{cliente.fecha_nacimiento ? new Date(cliente.fecha_nacimiento).toLocaleDateString() : "-"}</div>

              <div className="text-gray-500">Sexo:</div>
              <div>
                {cliente.sexo
                  ? cliente.sexo.charAt(0).toUpperCase() + cliente.sexo.slice(1)
                  : "-"}
              </div>

              <div className="text-gray-500">Fecha de Registro:</div>
              <div>{new Date(cliente.fecha_registro).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#ca5c71] text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Cerrar
          </button>
        </div>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">
          ✕
        </button>
      </div>
    </div>
  )
}
