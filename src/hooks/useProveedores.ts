import { useEffect, useState, useRef } from "react";
import { Proveedor } from "../types/Proveedor";

const proveedoresIniciales: Proveedor[] = [/*... mismo array */];

export const useProveedores = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>(proveedoresIniciales);
  const [nuevoProveedor, setNuevoProveedor] = useState<Omit<Proveedor, "id">>({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    ruc: "",
    estado: "Activo",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const limpiarFormulario = () => {
    setNuevoProveedor({
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      ruc: "",
      estado: "Activo",
    });
    setEditId(null);
  };

  const agregarProveedor = () => {
    if (!nuevoProveedor.nombre.trim() || !nuevoProveedor.telefono.trim() ||
        !nuevoProveedor.correo.trim() || !nuevoProveedor.direccion.trim() ||
        !nuevoProveedor.ruc.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (editId !== null) {
      setProveedores(
        proveedores.map((p) =>
          p.id === editId ? { id: editId, ...nuevoProveedor } : p
        )
      );
      setMensaje("Proveedor actualizado correctamente");
    } else {
      const nuevoId = proveedores.length
        ? proveedores[proveedores.length - 1].id + 1
        : 1;
      setProveedores([...proveedores, { id: nuevoId, ...nuevoProveedor }]);
      setMensaje("Proveedor agregado correctamente");
    }
    limpiarFormulario();
  };

  const eliminarProveedor = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id));
      setMensaje("Proveedor eliminado");
    }
  };

  const editarProveedor = (p: Proveedor) => {
    setNuevoProveedor({ ...p });
    setEditId(p.id);
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.correo.toLowerCase().includes(search.toLowerCase()) ||
    p.ruc.includes(search)
  );

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return {
    proveedores,
    setProveedores,
    nuevoProveedor,
    setNuevoProveedor,
    agregarProveedor,
    eliminarProveedor,
    editarProveedor,
    limpiarFormulario,
    proveedoresFiltrados,
    editId,
    setEditId,
    mensaje,
    search,
    setSearch,
    inputFileRef,
    setMensaje,
  };
};
