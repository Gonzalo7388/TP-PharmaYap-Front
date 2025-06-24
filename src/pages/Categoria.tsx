import { useEffect, useState } from "react";
import {
  fetchCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria as deleteCategoriaAPI,
} from "../api/categorias";

import CategoriaTable from "../components/Categorias/CategoriaTable";
import CategoriaFormModal from "../components/Categorias/CategoriaFormModal";
import CategoriaViewModal from "../components/Categorias/CategoriaViewModal";
import { Categoria } from "../types/Categoria";


import { FiPlus } from "react-icons/fi";
import { soloLetras, descripcionValida } from "../utils/validaciones";


export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editCategoria, setEditCategoria] = useState<Categoria | null>(null);
  const [nuevaCategoria, setNuevaCategoria] = useState<Categoria | null>(null);
  const [categoriaVisualizar, setCategoriaVisualizar] = useState<Categoria | null>(null);


  useEffect(() => {
    fetchCategorias()
      .then((res) =>
        setCategorias(
          res.data.map((c: any) => ({
            _id: c._id,
            nombre: c.nombre,
            descripcion: c.descripcion,
          }))
        )
      )
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  const [loading, setLoading] = useState(false);

  const handleAddNueva = () => {
    if (
      nuevaCategoria &&
      soloLetras(nuevaCategoria.nombre.trim()) &&
      descripcionValida(nuevaCategoria.descripcion.trim())
    ) {
      setLoading(true); // activar loading antes de la llamada
      createCategoria(nuevaCategoria)
        .then((res) => {
          const nueva = {
            _id: res.data._id,
            nombre: res.data.nombre,
            descripcion: res.data.descripcion,
          };
          setCategorias((prev) => [...prev, nueva]);
          setNuevaCategoria(null);
        })
        .catch(() => alert("Error al agregar categoría"))
        .finally(() => setLoading(false)); // desactivar loading al finalizar
    } else {
      alert("Campos inválidos.");
    }
  };

  const handleSaveEdit = () => {
    if (
      editCategoria &&
      soloLetras(editCategoria.nombre.trim()) &&
      descripcionValida(editCategoria.descripcion.trim())
    ) {
      updateCategoria(editCategoria._id, {
        nombre: editCategoria.nombre,
        descripcion: editCategoria.descripcion,
      })
        .then(() => {
          setCategorias((prev) =>
            prev.map((c) => (c._id === editCategoria._id ? editCategoria : c))
          );
          setEditCategoria(null);
        })
        .catch(() => alert("Error al actualizar categoría"));
    } else {
      alert("Campos inválidos.");
    }
  };

  const eliminarCategoria = (id: string) => {
    if (window.confirm("¿Eliminar categoría?")) {
      deleteCategoriaAPI(id)
        .then(() => setCategorias((prev) => prev.filter((c) => c._id !== id)))
        .catch(() => alert("Error al eliminar categoría"));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Categorías</h1>
        <button
          onClick={() => setNuevaCategoria({ _id: "", nombre: "", descripcion: "" })}
          disabled={loading}
          className={`bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FiPlus className="mr-2" /> Nueva Categoría
        </button>
      </div>

      <CategoriaTable
        categorias={categorias}
        onEdit={setEditCategoria}
        onDelete={eliminarCategoria}
        onView={setCategoriaVisualizar}
      />

      {(editCategoria || nuevaCategoria) && (
        <CategoriaFormModal
          categoria={(editCategoria || nuevaCategoria) as Categoria}
          onClose={() => {
            setEditCategoria(null);
            setNuevaCategoria(null);
          }}
          onChange={(cat) =>
            editCategoria ? setEditCategoria(cat) : setNuevaCategoria(cat)
          }
          onSave={editCategoria ? handleSaveEdit : handleAddNueva}
          loading={loading}  // <-- Pasar loading aquí
        />


      )}

      {categoriaVisualizar && (
        <CategoriaViewModal
          categoria={categoriaVisualizar}
          onClose={() => setCategoriaVisualizar(null)}
        />
      )}
    </>
  );
}
