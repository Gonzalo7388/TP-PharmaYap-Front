// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import Productos from "../pages/Productos";
import PrincipiosActivos from "../pages/PrincipiosActivos";
import Categoria from "../pages/Categoria";
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import HomePage from "../pages/HomePage";
import Trabajadores from "../pages/Trabajadores";
import Pedidos from "../pages/Pedido";
import CartDetailPage from '../pages/CartDetailPage'; // <--- Ensure this import is correct

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/crud/productos" element={<Productos />} />
      <Route path="/crud/principios-activos" element={<PrincipiosActivos />} />
      <Route path="/crud/categorias" element={<Categoria />} />
      <Route path="/crud/usuarios" element={<Clientes />} />
      <Route path="/crud/proveedores" element={<Proveedores />} />
      <Route path="/crud/trabajadores" element={<Trabajadores />} />
      <Route path="/crud/pedidos" element={<Pedidos />} />
      <Route path="/cart-details" element={<CartDetailPage />} /> {/* <--- Ensure this route is present and correct */}

    </Routes>
  );
};

export default AppRoutes;
