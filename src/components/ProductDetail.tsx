import React from "react";
import { Producto } from "../data/products";

interface ProductDetailProps {
  selectedProduct: Producto | null;
  setSelectedProduct: (product: Producto | null) => void;
  detailRef: React.RefObject<HTMLDivElement | null>;
}


const ProductDetail: React.FC<ProductDetailProps> = ({ selectedProduct, setSelectedProduct, detailRef }) => {
  if (!selectedProduct) return null;

  return (
    <section ref={detailRef} className="py-10 px-4 bg-white rounded-2xl mb-6">
      <h2 className="text-2xl font-bold text-[#B73852] mb-4">Detalles del producto</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={selectedProduct.image} alt={selectedProduct.name} className="h-64 w-full md:w-1/2 object-cover rounded-xl" />
        <div className="flex-1">
          <p><strong>ID:</strong> {selectedProduct.id}</p>
          <p><strong>Nombre:</strong> {selectedProduct.name}</p>
          <p><strong>Descripción:</strong> {selectedProduct.description}</p>
          <p><strong>Precio:</strong> S/. {selectedProduct.price}</p>
          <button
            onClick={() => setSelectedProduct(null)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Volver
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
