import { useState, useEffect } from 'react';
import { Producto } from '../../types/Producto';
import { fetchCategorias as apiFetchCategorias, mapCategoria } from '../../api/categorias';
import { getPrincipiosActivos } from '../../api/principiosActivos';


interface Categoria { _id: string; nombre: string; }
interface PrincipioActivo { _id: string; nombre: string; }

interface Props {
  producto: Producto;
  onClose: () => void;
  onSave: (producto: Producto, isNew: boolean) => void;
  isNew: boolean;
}

export default function ProductoFormModal({ producto, onClose, onSave, isNew }: Props) {
  const [formData, setFormData] = useState<Producto>(producto);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [principios, setPrincipios] = useState<PrincipioActivo[]>([]);

  useEffect(() => {
    // Asegura que producto tenga principio_activo para evitar error
    setFormData({
      ...producto,
      principio_activo: producto.principio_activo || '',
    });
    fetchCategorias();
    fetchPrincipios();
  }, [producto]);


  const fetchCategorias = async () => {
    try {
      const res = await apiFetchCategorias();
      const data = res.data.map(mapCategoria);
      setCategorias(data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };


  const fetchPrincipios = async () => {
    try {
      const data = await getPrincipiosActivos();
      setPrincipios(data);
    } catch (error) {
      console.error("Error al obtener principios activos:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;

    let value: string | boolean = '';

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre && formData.precio_unitario && formData.stock) {
      onSave(formData, isNew);
    } else {
      alert('Completa todos los campos obligatorios.');
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl relative">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">{isNew ? 'Nuevo Producto' : 'Editar Producto'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">

          <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded" required />
          <input name="precio_unitario" type="number" value={formData.precio_unitario || ''} onChange={handleChange} placeholder="Precio Unitario" className="border p-2 rounded" required />

          <input name="stock" type="number" value={formData.stock || ''} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" required />
          <input name="stock_minimo" type="number" value={formData.stock_minimo || ''} onChange={handleChange} placeholder="Stock Mínimo" className="border p-2 rounded" />

          <input name="unidad_medida" value={formData.unidad_medida || ''} onChange={handleChange} placeholder="Unidad de Medida" className="border p-2 rounded" />
          <input name="registro_sanitario" value={formData.registro_sanitario || ''} onChange={handleChange} placeholder="Registro Sanitario" className="border p-2 rounded" />

          <input name="fecha_vencimiento" type="date" value={formData.fecha_vencimiento || ''} onChange={handleChange} className="border p-2 rounded" />
          <input name="imagen" value={formData.imagen || ''} onChange={handleChange} placeholder="URL Imagen" className="border p-2 rounded" />

          <div className="col-span-2">
            <textarea name="descripcion" value={formData.descripcion || ''} onChange={handleChange} placeholder="Descripción" className="border p-2 rounded w-full" />
          </div>

          <div className="col-span-1">
            <label className="block font-semibold text-gray-600 mb-1">Categoría</label>
            <select name="categoria" value={typeof formData.categoria === 'string' ? formData.categoria : formData.categoria?._id || ''}
              onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block font-semibold text-gray-600 mb-1">Principio Activo</label>
            <select
              name="principio_activo"
              value={typeof formData.principio_activo === 'string' ? formData.principio_activo : formData.principio_activo?._id || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Selecciona un principio activo</option>
              {principios.map(pa => (
                <option key={pa._id} value={pa._id}>{pa.nombre}</option>
              ))}
            </select>

          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input type="checkbox" name="es_recetado" checked={formData.es_recetado || false} onChange={handleChange} />
            <label>Requiere receta médica</label>
          </div>

          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-[#ca5c71] text-white hover:bg-pink-700 rounded">Guardar</button>
          </div>
        </form>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">✕</button>
      </div>
    </div>
  );
}
