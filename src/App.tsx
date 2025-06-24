// src/App.tsx
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Index";
import { CartProvider } from "./context/CartContext"; // Keep CartProvider import
// REMOVE useCart import: import { CartProvider, useCart } from "./context/CartContext";
// REMOVE CartModal import: import CartModal from "./components/Pedidos/CartModal";

import GlobalModals from "./components/GlobalModals"; // <--- NEW: Import GlobalModals

const App = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  // REMOVE: const { cartItems, getCartTotal, handleIncrementCart, handleDecrementCart, handleRemoveFromCart } = useCart();

  return (
    // CartProvider must wrap any component that uses useCart
    <CartProvider>
      <BrowserRouter>
        <Header onCartClick={() => setShowCartModal(true)} />
        <AppRoutes />
        <Footer />

        {/* Render the new GlobalModals component here */}
        <GlobalModals
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
        />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;