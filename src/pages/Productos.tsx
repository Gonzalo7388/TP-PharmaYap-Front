import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import ProductoTable from '../components/Productos/ProductoTable';
import ProductoFormModal from '../components/Productos/ProductoFormModal';
import ProductoViewModal from '../components/Productos/ProductoViewModal';
import { Producto } from '../types/Producto';
import { Categoria } from '../types/Categoria';

import { getProductos } from '../api/productos'; // 
import { createProducto } from '../api/productos'; // 
import { deleteProducto } from '../api/productos'; // 
import { updateProducto } from '../api/productos'; //


export default function ProductoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  const [editProducto, setEditProducto] = useState<Producto | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto | null>(null);
  const [productoVisualizar, setProductoVisualizar] = useState<Producto | null>(null);

  // useEffect para cargar productos desde API al montar el componente
  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEdit = (producto: Producto) => {
    setEditProducto(producto);
  };

  const handleView = (producto: Producto) => {
    setProductoVisualizar(producto);
  };

  const handleSave = async (producto: Producto, isNew: boolean) => {
    try {
      const payload: any = {
        ...producto,
        categoria: typeof producto.categoria === 'object' ? producto.categoria._id : producto.categoria,
        principio_activo: typeof producto.principio_activo === 'object' ? producto.principio_activo._id : producto.principio_activo,
      };

      // Eliminar campos no deseados
      delete payload._id;
      delete payload.createdAt;
      delete payload.updatedAt;

      if (isNew) {
        await createProducto(payload);
      } else {
        await updateProducto(producto._id, payload); 
      }

      await fetchProductos();
      setEditProducto(null);
      setNuevoProducto(null);
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };




  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProducto(id); // llamada al backend
        await fetchProductos();   // recarga productos actualizados
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
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
                _id: '',
                nombre: '',
                descripcion: '',
              } as Categoria,
              principio_activo: '', // ✅ agregado
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
