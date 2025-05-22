import { useState, useEffect } from 'react';
import { Producto } from '../../pages/Productos';

interface Props {
  producto: Producto;
  onClose: () => void;
  onSave: (producto: Producto, isNew: boolean) => void;
  isNew: boolean;
}

export default function ProductoFormModal({ producto, onClose, onSave, isNew }: Props) {
  const [formData, setFormData] = useState<Producto>(producto);

  useEffect(() => {
    setFormData(producto);
  }, [producto]);

  const soloLetras = (valor: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
  const isURL = (valor: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(valor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { codigo, nombre, categoria, receta, imagen } = formData;
    if (codigo && nombre && soloLetras(categoria) && soloLetras(receta) && isURL(imagen)) {
      onSave(formData, isNew);
    } else {
      alert('Todos los campos deben ser válidos.');
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">{isNew ? 'Nuevo Producto' : 'Editar Producto'}</h2>
        <form onSubmit={handleSubmit}>
          {['codigo', 'nombre', 'categoria', 'receta', 'imagen'].map(field => (
            <div key={field}>
              <label className="block mb-2 font-semibold text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field as keyof Producto]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                required
              />
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-[#ca5c71] text-white hover:bg-pink-700">Guardar</button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#ca5c71] text-lg">✕</button>
      </div>
    </div>
  );
}
