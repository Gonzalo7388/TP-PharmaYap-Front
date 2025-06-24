"use client";

import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import type { Cliente } from "../../types/Cliente";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ClienteTableProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: string) => void;
  onView: (cliente: Cliente) => void;
  onToggleEstado: (id: string) => void;
}

export default function ClienteTable({
  clientes,
  onEdit,
  onDelete,
  onView,
  onToggleEstado,
}: ClienteTableProps) {
  const rolesChartData = [
    { sexo: "femenino", cantidad: clientes.filter((c) => c.sexo === "femenino").length },
    { sexo: "masculino", cantidad: clientes.filter((c) => c.sexo === "masculino").length },
    { sexo: "otro", cantidad: clientes.filter((c) => c.sexo === "otro").length },
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f8e1e5]">
            <tr>
              {[
                "Nombre",
                "Apellido",
                "Correo Electrónico",
                "DNI",
                "Teléfono",
                "Dirección",
                "Fecha Nacimiento",
                "Sexo",
                "Fecha Registro",
                "Acciones",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-semibold text-[#ca5c71] uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => {
              const isActive = cliente.estado_cuenta === "Activo";

              return (
                <tr
                  key={cliente._id}
                  className={`transition-colors ${isActive ? "bg-white" : "bg-gray-100 opacity-50"}`}
                >
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>{cliente.nombre}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>{cliente.apellido}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>
                      <a
                        href={`mailto:${cliente.correo_electronico}`}
                        className="text-[#ca5c71] hover:text-pink-700"
                      >
                        {cliente.correo_electronico}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>{cliente.dni}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>{cliente.telefono}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>{cliente.direccion}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>
                      {cliente.fecha_nacimiento || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>{cliente.sexo}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={!isActive ? "pointer-events-none" : ""}>
                      {cliente.fecha_registro || "-"}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={isActive}
                          onChange={() => onToggleEstado(cliente._id)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ca5c71] relative transition-all">
                          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
                        </div>
                      </label>

                      <div className={!isActive ? "pointer-events-none opacity-50" : ""}>
                        <button
                          onClick={() => onView(cliente)}
                          className="mr-2 text-gray-600 hover:text-[#ca5c71]"
                          title="Ver detalles"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => onEdit(cliente)}
                          className="mr-2 text-gray-600 hover:text-[#ca5c71]"
                          title="Editar"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => onDelete(cliente._id)}
                          className="text-gray-600 hover:text-red-500"
                          title="Eliminar"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-sm text-gray-500">
          <span>
            Mostrando {clientes.length} de {clientes.length} registros
          </span>
          <div className="flex space-x-4">
            <button className="text-[#ca5c71] hover:text-pink-700 disabled:text-gray-300" disabled>
              Anterior
            </button>
            <button className="text-[#ca5c71] hover:text-pink-700">Siguiente</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Sexo</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={rolesChartData}>
            <XAxis dataKey="sexo" stroke="#ca5c71" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#ca5c71" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
