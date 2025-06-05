// src/components/PrincipiosActivos/PrincipioActivoFormModal.tsx
import { useEffect, useState } from 'react';
import { PrincipioActivo } from '../../types/PrincipioActivo';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<PrincipioActivo, '_id'>, idToUpdate?: string) => void;
    initialData?: PrincipioActivo | null;
}

export default function PrincipioActivoFormModal({
    open,
    onClose,
    onSubmit,
    initialData,
}: Props) {
    const [formData, setFormData] = useState<{ nombre: string; descripcion: string }>({
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                descripcion: initialData.descripcion || '',
            });
        } else {
            setFormData({ nombre: '', descripcion: '' });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre.trim()) {
            alert('El nombre es obligatorio.');
            return;
        }
        onSubmit(
            {
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion.trim(),
            },
            initialData?._id
        );
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4 text-[#ca5c71]">
                    {initialData ? 'Editar Principio Activo' : 'Nuevo Principio Activo'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label htmlFor="nombre" className="block font-semibold text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Nombre del principio activo"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="descripcion" className="block font-semibold text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Descripción (opcional)"
                            rows={3}
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#ca5c71] text-white hover:bg-pink-700 rounded"
                        >
                            {initialData ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
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
