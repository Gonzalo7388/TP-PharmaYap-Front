import React from "react";
import { Producto } from "../../data/products"; // Using data/products for now as per your structure
import { FiX, FiTrash2 } from "react-icons/fi"; // <--- ADD FiTrash2 here!


interface CartItem {
  product: Producto;
  quantity: number;
}

interface CartModalProps {
  showModal: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  getCartTotal: () => number;
  // Add the new props here:
  onIncrementCart: (productId: number) => void; // <--- ADDED
  onDecrementCart: (productId: number) => void; // <--- ADDED
  onRemoveFromCart: (productId: number) => void; // <--- ADDED
}

const CartModal: React.FC<CartModalProps> = ({
  showModal,
  onClose,
  cartItems,
  getCartTotal,
  // Destructure the new props here so you can use them:
  onIncrementCart,   // <--- ADDED
  onDecrementCart,   // <--- ADDED
  onRemoveFromCart,  // <--- ADDED
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
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

        {/* Modal Body: Cart Items List */}
        <div className="max-h-[50vh] overflow-y-auto divide-y divide-gray-200">
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
                  <div className="flex items-center space-x-2"> {/* Changed to flex items-center space-x-2 for quantity controls */}
                    {/* Quantity controls: */}
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
                        <FiTrash2 size={16} /> {/* Using FiTrash2 here for consistency with ProductDetail */}
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

        {/* Modal Footer: Total and Purchase Button */}
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">
              S/. {getCartTotal().toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors">
            Realizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;