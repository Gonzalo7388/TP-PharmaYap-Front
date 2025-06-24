// src/pages/CartDetailPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CartDetailPage: React.FC = () => {
  const {
    cartItems,
    getCartTotal,
    handleIncrementCart,
    handleDecrementCart,
    handleRemoveFromCart, // Make sure this matches your CartContext function name
  } = useCart();

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-[#B73852] mb-6 text-center">
        Carrito de Compras
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <p className="text-gray-700 text-lg mb-4">Tu carrito está vacío.</p>
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Explorar Productos
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-grow bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#6B2C3B] mb-4">Productos en el Carrito</h2>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-24 w-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-xl text-gray-800">{item.product.name}</p>
                      <p className="text-gray-600">Categoría: {item.product.category}</p>
                      <p className="text-lg font-medium text-[#B73852]">S/. {item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleDecrementCart(item.product.id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-md text-gray-700 text-xl font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrementCart(item.product.id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-md text-gray-700 text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors"
                      aria-label="Eliminar producto"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
            <h2 className="text-2xl font-semibold text-[#6B2C3B] mb-4">Resumen del Pedido</h2>
            <div className="flex justify-between items-center text-lg mb-2">
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):</span>
              <span className="font-semibold">S/. {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold border-t pt-4 mt-4">
              <span>Total:</span>
              <span>S/. {getCartTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={() => alert("Proceed to Checkout logic here!")} // Placeholder for checkout
              className="mt-6 w-full bg-[#B73852] hover:bg-[#A03045] text-white font-bold py-3 px-6 rounded-md transition-colors text-lg"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetailPage;