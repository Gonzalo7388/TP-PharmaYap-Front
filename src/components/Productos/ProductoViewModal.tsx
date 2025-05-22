import { Producto } from '../../pages/Productos';

interface Props {
  producto: Producto;
  onClose: () => void;
}

export default function ProductoViewModal({ producto, onClose }: Props) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">Detalles del Producto</h2>
        <div className="space-y-4">
          <p><strong>Código:</strong> {producto.codigo}</p>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Receta:</strong> {producto.receta}</p>
          <div>
            <strong>Imagen:</strong>
            <img src={producto.imagen} alt={producto.nombre} className="mt-2 w-full h-48 object-cover rounded" />
          </div>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">✕</button>
      </div>
    </div>
  );
}
