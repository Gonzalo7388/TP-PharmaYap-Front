// src/components/Categorias/CategoriaViewModal.tsx
import { Categoria } from "../../types/Categoria";

interface Props {
  categoria: Categoria;
  onClose: () => void;
}

export default function CategoriaViewModal({ categoria, onClose }: Props) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Detalles de Categoría</h2>
        <div className="space-y-4">
          <p><strong>ID:</strong> {categoria._id}</p>
          <p><strong>Nombre:</strong> {categoria.nombre}</p>
          <p><strong>Descripción:</strong> {categoria.descripcion}</p>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">✕</button>
      </div>
    </div>
  );
}
