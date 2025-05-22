import React from "react";
import { ShoppingCart, LogIn, Search, Menu } from "lucide-react";
import ProductCart from "./ProductCart";


interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, setMenuOpen }) => {
  return (
    <header className="flex items-center justify-between py-4 bg-white shadow-md h-24 w-full rounded-2xl relative">
      <div className="h-full flex items-center gap-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <Menu size={28} className="text-[#B73852]" />
        </button>
        <img src="/logo.png" alt="Company Logo" className="h-16 object-contain rounded-xl" />
        <div className="relative ml-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Medicamentos y artículos sanitarios"
            className="border text-base p-3 pl-10 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          />
        </div>
      </div>

      <div className="flex gap-6 items-center text-base">
        <ProductCart />

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl">
          <LogIn size={20} /> Login
        </button>


      </div>

      {menuOpen && (
        <div className="absolute top-24 left-4 bg-[#FAD1D8] border border-[#F8AEBB] shadow-2xl rounded-2xl p-5 z-50 w-72 animate-fade-in">
          <h3 className="text-xl font-bold mb-4 text-[#B73852] tracking-wide">
            Panel de Administración
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Productos", path: "/crud/productos" },
              { name: "Categorías", path: "/crud/categorias" },
              { name: "Clientes", path: "/crud/usuarios" },
              { name: "Trabajadores", path: "/crud/pedidos" },
              { name: "Proveedores", path: "/crud/proveedores" },
            ].map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className="block bg-white rounded-xl px-4 py-2 text-[#B73852] hover:bg-[#DC546C] hover:text-white transition duration-300 shadow-sm hover:shadow-md"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
