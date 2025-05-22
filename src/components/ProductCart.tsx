import React from "react";
import { ShoppingCart } from "lucide-react";

const ProductCart: React.FC = () => (
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white shadow hover:bg-gray-100">
    <ShoppingCart size={20} /> Carrito
  </button>
);

export default ProductCart;
