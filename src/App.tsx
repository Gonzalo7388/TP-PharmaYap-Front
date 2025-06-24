// src/App.tsx
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Index";
import { CartProvider } from "./context/CartContext";
import GlobalModals from "./components/GlobalModals";

const App = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Header onCartClick={() => setShowCartModal(true)} />
        <AppRoutes /> {/* This is where your routes, including /cart-details, are rendered */}
        <Footer />
        <GlobalModals
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
        />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;