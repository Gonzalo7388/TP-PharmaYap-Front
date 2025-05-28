import React from "react";
import { FiBox, FiTag, FiUsers, FiTruck, FiClipboard } from "react-icons/fi";
import NavButton from "./NavButton";  // Importar el componente NavButton
import UserIcons from "./UserIcons";  // Importar el componente UserIcons

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 space-x-6"> {/* Espaciado de los elementos */}
          
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="PharmaYap Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          
          {/* Navbar */}
          <nav className="hidden md:flex space-x-8 flex-grow">  {/* Añadí flex-grow para expandir el navbar */}
            <NavButton to="/" label="Inicio" icon={<FiBox className="mr-1" />} />
            <NavButton to="/crud/productos" label="Productos" icon={<FiBox className="mr-1" />} />
            <NavButton to="/crud/categorias" label="Categorías" icon={<FiTag className="mr-1" />} />
            <NavButton to="/crud/usuarios" label="Clientes" icon={<FiUsers className="mr-1" />} />
            <NavButton to="/crud/Trabajadores" label="Trabajadores" icon={<FiClipboard className="mr-1" />} />
            <NavButton to="/crud/proveedores" label="Proveedores" icon={<FiTruck className="mr-1" />} />
          </nav>
          
          {/* Íconos a la derecha */}
          <div className="flex items-center space-x-4">
            <UserIcons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
