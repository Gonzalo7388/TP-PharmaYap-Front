import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { PrincipioActivo } from '../types/PrincipioActivo';
import {
    getPrincipiosActivos,
    createPrincipioActivo,
    updatePrincipioActivo,
    deletePrincipioActivo,
} from '../api/principiosActivos';

import PrincipioActivoTable from '../components/PrincipiosActivos/PrincipioActivoTable';
import PrincipioActivoFormModal from '../components/PrincipiosActivos/PrincipioActivoFormModal';

export default function PrincipiosActivosPage() {
    const [principiosActivos, setPrincipiosActivos] = useState<PrincipioActivo[]>([]);
    const [editItem, setEditItem] = useState<PrincipioActivo | null>(null);
    // Cambiar nuevoItem para que sea solo booleano o un objeto sin _id
    const [nuevoItem, setNuevoItem] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPrincipiosActivos();
                setPrincipiosActivos(data);
            } catch (error) {
                console.error('Error al cargar principios activos:', error);
            }
        };
        fetchData();
    }, []);

    const handleSave = async (item: Omit<PrincipioActivo, '_id'>, idToUpdate?: string) => {
        try {
            let saved: PrincipioActivo;
            if (idToUpdate) {
                saved = await updatePrincipioActivo(idToUpdate, item);
                setPrincipiosActivos(prev =>
                    prev.map(p => (p._id === saved._id ? saved : p))
                );
            } else {
                saved = await createPrincipioActivo(item);
                setPrincipiosActivos(prev => [...prev, saved]);
            }
            setEditItem(null);
            setNuevoItem(false);
        } catch (error) {
            console.error('Error al guardar el principio activo:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este principio activo?')) {
            try {
                await deletePrincipioActivo(id);
                setPrincipiosActivos(prev => prev.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Principios Activos</h1>
                <button
                    onClick={() => setNuevoItem(true)} // Aquí activamos la creación
                    className="bg-[#ca5c71] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-md flex items-center"
                >
                    <FiPlus className="mr-2" /> Nuevo Principio Activo
                </button>
            </div>

            <PrincipioActivoTable
                data={principiosActivos}
                onEdit={(item) => setEditItem(item)}
                onDelete={handleDelete}
            />

            <PrincipioActivoFormModal
                open={!!editItem || nuevoItem}
                initialData={editItem || undefined} // solo para edición
                onClose={() => {
                    setEditItem(null);
                    setNuevoItem(false);
                }}
                onSubmit={handleSave}
            />
        </>
    );
}
