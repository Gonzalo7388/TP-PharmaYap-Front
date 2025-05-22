import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-[#ca5c71] border-t mt-8 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <span className="text-xl font-semibold">Online Pharmacy</span>
          <p className="mt-2 text-sm max-w-xs">
            PharmaYap es la solución ideal para farmacias de todos los tamaños.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Enlaces</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Nosotros</a></li>
              <li><a href="#" className="hover:underline">Catálogo</a></li>
              <li><a href="#" className="hover:underline">Trabajadores</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Políticas</a></li>
              <li><a href="#" className="hover:underline">Términos</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-pink-300 text-sm text-center">
        © 2025 PharmaYap. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
