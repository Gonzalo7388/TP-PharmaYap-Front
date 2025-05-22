import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import ProductoTable from '../components/Productos/ProductoTable';
import ProductoFormModal from '../components/Productos/ProductoFormModal';
import ProductoViewModal from '../components/Productos/ProductoViewModal';
import { Producto } from '../types/Producto';
import { getProductos } from '../api/productos'; // o donde esté tu API
import { Categoria } from '../types/Categoria';

export default function ProductoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  const [editProducto, setEditProducto] = useState<Producto | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto | null>(null);
  const [productoVisualizar, setProductoVisualizar] = useState<Producto | null>(null);

  // useEffect para cargar productos desde API al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const handleEdit = (producto: Producto) => {
    setEditProducto(producto);
  };

  const handleView = (producto: Producto) => {
    setProductoVisualizar(producto);
  };

  const handleSave = (producto: Producto, isNew: boolean) => {
    if (isNew) {
      setProductos(prev => [...prev, producto]);
    } else {
      setProductos(prev => prev.map(p => (p._id === producto._id ? producto : p)));
    }
    setEditProducto(null);
    setNuevoProducto(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos(prev => prev.filter(p => p._id !== id));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
        <button
          onClick={() =>
            setNuevoProducto({
              _id: '',
              nombre: '',
              descripcion: '',
              precio_unitario: 0,
              stock: 0,
              stock_minimo: 0,
              unidad_medida: '',
              imagen: '',
              registro_sanitario: '',
              fecha_vencimiento: '',
              es_recetado: false,
              categoria: {
                id: '',      // solo las propiedades definidas en Categoria
                nombre: '',
                descripcion: '',
              } as Categoria,
              createdAt: '',
              updatedAt: '',
            })
          }
          className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
        >
          <FiPlus className="mr-2" /> Nuevo Producto
        </button>
      </div>

      <ProductoTable
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {(editProducto || nuevoProducto) && (
        <ProductoFormModal
          producto={(editProducto || nuevoProducto)!}
          onClose={() => {
            setEditProducto(null);
            setNuevoProducto(null);
          }}
          onSave={handleSave}
          isNew={!editProducto}
        />
      )}

      {productoVisualizar && (
        <ProductoViewModal
          producto={productoVisualizar}
          onClose={() => setProductoVisualizar(null)}
        />
      )}
    </>
  );
}
