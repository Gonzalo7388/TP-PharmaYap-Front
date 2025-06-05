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
        <div className="space-y-2 text-sm">
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio Unitario:</strong> S/ {producto.precio_unitario.toFixed(2)}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>
          <p><strong>Stock Mínimo:</strong> {producto.stock_minimo ?? '-'}</p>
          <p><strong>Unidad de Medida:</strong> {producto.unidad_medida ?? '-'}</p>
          <p><strong>Registro Sanitario:</strong> {producto.registro_sanitario ?? '-'}</p>
          <p><strong>Fecha de Vencimiento:</strong> {producto.fecha_vencimiento ?? '-'}</p>
          <p><strong>Requiere Receta:</strong> {producto.es_recetado ? 'Sí' : 'No'}</p>
          <p><strong>Categoría:</strong> {typeof producto.categoria === 'string' ? producto.categoria : producto.categoria?.nombre}</p>
          <p><strong>Principio Activo:</strong> {typeof producto.principio_activo === 'string' ? producto.principio_activo : producto.principio_activo?.nombre}</p>

          {producto.imagen && (
            <div>
              <strong>Imagen:</strong>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="mt-2 w-full h-48 object-cover rounded"
              />
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
