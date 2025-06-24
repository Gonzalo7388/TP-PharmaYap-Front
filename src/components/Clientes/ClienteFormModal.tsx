"use client"

import React, { useState, useEffect } from "react"
import type { Cliente } from "../../types/Cliente"

interface ClienteFormModalProps {
  cliente: Cliente
  onClose: () => void
  onSave: (cliente: Cliente, isNew: boolean) => void
  isNew: boolean
}

export default function ClienteFormModal({ cliente, onClose, onSave, isNew }: ClienteFormModalProps) {
  const [formData, setFormData] = useState<Cliente>({ ...cliente })

  useEffect(() => {
    setFormData({ ...cliente })
  }, [cliente])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleEstado = () => {
    setFormData((prev) => ({
      ...prev,
      estado_cuenta: prev.estado_cuenta === "Activo" ? "Inactivo" : "Activo",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData, isNew)
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">{isNew ? "Agregar Nuevo Cliente" : "Editar Cliente"}</h2>
        <form onSubmit={handleSubmit}>
          {[
            ["nombre", "Nombre"],
            ["apellido", "Apellido"],
            ["correo_electronico", "Correo Electrónico"],
            ["contrasena", "Contraseña"],
            ["dni", "DNI"],
            ["telefono", "Teléfono"],
            ["direccion", "Dirección"],
            ["fecha_nacimiento", "Fecha de Nacimiento"],
          ].map(([key, label]) => (
            <div key={key} className="mb-3">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={key === "fecha_nacimiento" ? "date" : key === "contrasena" ? "password" : "text"}
                name={key}
                value={(formData[key as keyof Cliente] ?? "") as string}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required={key !== "telefono" && key !== "direccion"} // Ejemplo: opcional teléfono y dirección
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Género</label>
            <select
              name="sexo"
              value={formData.sexo ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Seleccione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {!isNew && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Estado de Cuenta</label>
              <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.estado_cuenta === "Activo"}
                  onChange={handleToggleEstado}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full relative peer-checked:bg-[#ca5c71] transition-colors duration-300">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:left-[1.625rem]" />
                </div>
                <span className="ml-3 text-sm">{formData.estado_cuenta}</span>
              </label>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#ca5c71] text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              {isNew ? "Agregar" : "Guardar Cambios"}
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">
          ✕
        </button>
      </div>
    </div>
  )
}
