// src/components/ProductDetail.tsx
import React, { forwardRef } from "react";
import { Producto } from "../data/products"; // Assuming Producto type is defined here or in types/Producto.ts
import { FiTrash2 } from "react-icons/fi"; // Import the trash icon

// Define a type for a cart item that includes the product and its quantity
interface CartItem {
  product: Producto;
  quantity: number;
}

interface ProductDetailProps {
  selectedProduct: Producto | null;
  setSelectedProduct: (product: Producto | null) => void;
  detailRef: React.RefObject<HTMLDivElement | null>;
  
  // New props for cart interaction
  productInCart?: CartItem; // Optional, if the product is already in the cart
  onAddToCart: (product: Producto) => void;
  onIncrementCart: (productId: number) => void;
  onDecrementCart: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void;

  // New prop for purchasing action
  onPurchaseClick: () => void; // Function to open the purchase type modal
}

// Use forwardRef to allow HomePage to pass a ref to this component
const ProductDetail = forwardRef<HTMLDivElement, ProductDetailProps>(
  (
    {
      selectedProduct,
      setSelectedProduct,
      detailRef,
      productInCart,
      onAddToCart,
      onIncrementCart,
      onDecrementCart,
      onRemoveFromCart,
      onPurchaseClick,
    },
    ref
  ) => {
    if (!selectedProduct) return null;

    return (
      <section ref={ref} className="py-10 px-4 bg-white rounded-2xl mb-6">
        <h2 className="text-2xl font-bold text-[#B73852] mb-4">
          Detalles del producto
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="h-64 w-full md:w-1/2 object-cover rounded-xl"
          />
          <div className="flex-1">
            <p>
              <strong>ID:</strong> {selectedProduct.id}
            </p>
            <p>
              <strong>Nombre:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Precio:</strong> S/. {selectedProduct.price.toFixed(2)}
            </p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-[#B73852] text-white rounded-lg hover:bg-[#a02e45] transition-colors duration-300 shadow-md"
              >
                Volver
              </button>
              <button
                onClick={onPurchaseClick} // This button triggers the purchase type modal
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors duration-300 shadow-md"
              >
                📦 Compra
              </button>
            </div>

            {/* Conditional rendering for "Agregar al carrito" vs. quantity controls */}
            <div className="mt-6">
              {!productInCart ? (
                <button
                  onClick={() => onAddToCart(selectedProduct)} // Pass the selected product
                  className="w-auto bg-pink-300 hover:bg-pink-400 text-white py-1 px-4 rounded-md transition-colors text-sm"
                >
                  Agregar al carrito
                </button>
              ) : (
                <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-md w-fit">
                  {productInCart.quantity > 1 ? (
                    <button
                      onClick={() => onDecrementCart(selectedProduct.id)}
                      className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                    >
                      <span className="text-xl">-</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onRemoveFromCart(selectedProduct.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  )}
                  <span className="text-xl font-bold">
                    {productInCart.quantity}
                  </span>
                  <button
                    onClick={() => onIncrementCart(selectedProduct.id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default ProductDetail;