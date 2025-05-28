// src/pages/Trabajadores.tsx
import React, { useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";
import { obtenerUsuarios } from "../api/usuarios";
import ExportButtons from "../components/Trabajadores/ExportButtonsTrabajadores";
import { AiOutlinePlus } from "react-icons/ai";

const Trabajadores: React.FC = () => {
  const [trabajadores, setTrabajadores] = useState<Usuario[]>([]);
  const [filteredTrabajadores, setFilteredTrabajadores] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const usuarios = await obtenerUsuarios();
        const trabajadoresFiltrados = usuarios.filter(usuario => usuario.rol === 'trabajador');
        setTrabajadores(trabajadoresFiltrados);
        setFilteredTrabajadores(trabajadoresFiltrados);
      } catch (error) {
        setError("Error al cargar los trabajadores");
      } finally {
        setLoading(false);
      }
    };

    fetchTrabajadores();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const resultados = trabajadores.filter((t) =>
      t.nombre.toLowerCase().includes(term) ||
      t.apellido.toLowerCase().includes(term) ||
      t.correo_electronico.toLowerCase().includes(term) ||
      t.rol.toLowerCase().includes(term)
    );
    setFilteredTrabajadores(resultados);
  };

  const exportarCSV = (trabajadores: Usuario[]) => {
    console.log("Exportando a Excel...", trabajadores);
    // Lógica real aquí
  };

  const exportarPDF = () => {
    console.log("Exportando a PDF...");
    // Lógica real aquí
  };

  if (loading) return <div className="text-center mt-10">Cargando trabajadores...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#ca5c71] mb-4">Gestión de Trabajadores</h1>

      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre, cargo o correo..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="flex gap-4 flex-wrap">
          <button className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-[#b04b5f] transition-colors shadow-md flex items-center">
            <AiOutlinePlus className="mr-2" />
            Agregar Trabajador
          </button>
          <ExportButtons
            trabajadores={filteredTrabajadores}
            onExportarCSV={exportarCSV}
            onExportarPDF={exportarPDF}
            onAgregar={() => {
              console.log("Agregar trabajador");
              // Aquí puedes abrir un modal, cambiar estado, redirigir, etc.
            }}
          />

        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Correo</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrabajadores.map((trabajador) => (
              <tr key={trabajador.id} className="border-t">
                <td className="py-3 px-4">{trabajador.nombre} {trabajador.apellido}</td>
                <td className="py-3 px-4">{trabajador.correo_electronico}</td>
                <td className="py-3 px-4 capitalize">{trabajador.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trabajadores;
