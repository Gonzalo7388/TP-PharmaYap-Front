import React from "react";
import { FiBox, FiTag, FiUsers, FiTruck, FiClipboard, FiActivity, FiShoppingCart } from "react-icons/fi"; // Added FiShoppingCart
import NavButton from "./NavButton";  // Importar el componente NavButton
import UserIcons from "./UserIcons";  // Importar el componente UserIcons

// 1. Define the props interface for Header
interface HeaderProps {
  onCartClick: () => void; // This prop is a function that takes no arguments and returns void
}

// 2. Accept onCartClick as a prop in the Header component
const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 space-x-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="PharmaYap Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Navbar */}
          <nav className="hidden md:flex space-x-8 flex-grow">
            <NavButton to="/" label="Inicio" icon={<FiBox className="mr-1" />} />
            <NavButton to="/crud/productos" label="Productos" icon={<FiBox className="mr-1" />} />
            <NavButton to="/crud/principios-activos" label="Principios Activos" icon={<FiActivity className="mr-1" />} />
            <NavButton to="/crud/categorias" label="Categorías" icon={<FiTag className="mr-1" />} />
            <NavButton to="/crud/usuarios" label="Clientes" icon={<FiUsers className="mr-1" />} />
            <NavButton to="/crud/Trabajadores" label="Trabajadores" icon={<FiClipboard className="mr-1" />} />
            <NavButton to="/crud/proveedores" label="Proveedores" icon={<FiTruck className="mr-1" />} />
            <NavButton to="/crud/pedidos" label="Pedidos" icon={<FiTruck className="mr-1" />} />
          </nav>

          {/* Íconos a la derecha */}
          <div className="flex items-center space-x-4">
            {/* 3. Add a button that uses the onCartClick prop */}
            <button
              onClick={onCartClick} // Call the function passed from HomePage
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Ver carrito de compras"
            >
              <FiShoppingCart className="w-6 h-6 text-gray-700" />
            </button>
            <UserIcons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;