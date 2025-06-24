// src/components/Pedidos/CartModal.tsx
import React from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { Producto } from "../../data/products";
import { Link } from "react-router-dom"; // Import Link for navigation

interface CartItem {
  product: Producto;
  quantity: number;
}

interface CartModalProps { // Keep the original interface name
  showModal: boolean; // Keep the original prop name
  onClose: () => void;
  cartItems: CartItem[];
  getCartTotal: () => number;
  onIncrementCart: (productId: number) => void;
  onDecrementCart: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ // Keep the original component name
  showModal, // Use 'showModal'
  onClose,
  cartItems,
  getCartTotal,
  onIncrementCart,
  onDecrementCart,
  onRemoveFromCart,
}) => {
  return (
    <>
      {/* Overlay for background dimming - only visible when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          showModal ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose} // Click outside to close
      ></div>

      {/* Sidebar itself */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transform transition-transform duration-300 z-50
                    ${showModal ? "translate-x-0" : "translate-x-full"}
                    w-full sm:w-96 flex flex-col`} // Adjusted width for responsiveness
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <h3 className="text-xl font-bold">Carrito de Compras</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar carrito"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Body: Cart Items List */}
        <div className="flex-grow overflow-y-auto divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <div className="px-6 py-4 text-gray-600 text-center">Tu carrito está vacío.</div>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={item.product.id || index}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">
                        {item.product.name}
                      </p>
                      <p className="text-gray-600">
                        S/. {item.product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Subtotal: S/.{" "}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.quantity > 1 ? (
                      <button
                        onClick={() => onDecrementCart(item.product.id)}
                        className="p-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                      >
                        <span className="text-xl">-</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                    <span className="text-lg font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrementCart(item.product.id)}
                      className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sidebar Footer: Total and Buttons */}
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">
              S/. {getCartTotal().toFixed(2)}
            </span>
          </div>
          <Link
            to="/cart-details" // This Link will navigate to the full cart details page
            onClick={onClose} // Close sidebar when navigating
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors text-center block mb-2"
          >
            Ver Carrito {/* "View Cart" button */}
          </Link>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors"
                  onClick={onClose} // You might remove this or change its function later
          >
            Realizar Compra {/* This button might eventually move to CartDetailPage */}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartModal;