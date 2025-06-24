// src/components/GlobalModals.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // This hook MUST be used within CartProvider
import CartModal from './Pedidos/CartModal'; // Import CartModal

interface GlobalModalsProps {
  showCartModal: boolean;
  setShowCartModal: (show: boolean) => void;
}

const GlobalModals: React.FC<GlobalModalsProps> = ({ showCartModal, setShowCartModal }) => {
  // Consume the cart context here, as this component will be rendered *inside* CartProvider
  const { cartItems, getCartTotal, handleIncrementCart, handleDecrementCart, handleRemoveFromCart } = useCart();

  return (
    <>
      <CartModal
        showModal={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cartItems}
        getCartTotal={getCartTotal}
        onIncrementCart={handleIncrementCart}
        onDecrementCart={handleDecrementCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      {/* You can add other global modals here if needed */}
    </>
  );
};

export default GlobalModals;