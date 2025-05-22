// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import Productos from "../pages/Productos";
import Categoria from "../pages/Categoria";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import HomePage  from "../pages/HomePage";
import Mono from "../pages/Mono";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/crud/productos" element={<Productos />} />
      <Route path="/crud/categorias" element={<Categoria />} />
      <Route path="/crud/usuarios" element={<Clientes />} />
      <Route path="/crud/proveedores" element={<Proveedores />} />
      <Route path="/mono" element={<Mono />} />
    </Routes>
  );
};

export default AppRoutes;
