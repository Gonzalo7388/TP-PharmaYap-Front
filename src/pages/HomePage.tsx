// src/pages/HomePage.tsx
import React, { useState, useRef, useEffect } from "react";
// Header and Footer imports should remain commented out or removed if handled by App.tsx
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail"; // Keep this import
import CategoryFilter from "../components/CategoryFilter";

import PurchaseTypeModal from "../components/Pedidos/PurchaseTypeModal";
import AddressModal from "../components/Clientes/AddressModal";
import CartModal from "../components/Pedidos/CartModal";
import ConfirmationModal from "../components/Pedidos/ConfirmationModal";
import { generatePdfBoleta } from '../utils/pdfGenerator';
import { useCart } from '../context/CartContext';

import { Producto } from "../data/products";
import { allProducts, categories } from "../data/products";

const HomePage: React.FC = () => {
  const { cartItems, handleAddToCart, handleIncrementCart, handleDecrementCart, handleRemoveFromCart, getCartTotal, clearCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const [showPurchaseTypeModal, setShowPurchaseTypeModal] = useState(false);
  const [purchaseType, setPurchaseType] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [additionalReferences, setAdditionalReferences] = useState("");
  const [numeroEncontrado, setNumeroEncontrado] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const detailRef = useRef<HTMLDivElement | null>(null);

  const [products, setProducts] = useState<Producto[]>(allProducts);
  const [availableCategories, setAvailableCategories] = useState<string[]>(categories);

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleOpenAddressModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPurchaseTypeModal(false);
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
    setShowPurchaseTypeModal(true);
  };

  const handleSaveAddress = () => {
    if (address) {
      alert(`Dirección guardada: ${address}. Referencias adicionales: ${additionalReferences || "Ninguna"}`);
      setShowAddressModal(false);
      setShowPurchaseTypeModal(true);
    } else {
      alert("Por favor, selecciona una dirección en el mapa.");
    }
  };

  const handleGenerateBoleta = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío. Agrega productos para generar la boleta.");
      return;
    }
    generatePdfBoleta(cartItems, purchaseType, address, additionalReferences, getCartTotal());
    clearCart();
    setShowConfirmation(false);
  };

  const productInCartForDetail = selectedProduct
    ? cartItems.find((item) => item.product.id === selectedProduct.id)
    : undefined;

  return (
    <div className="bg-gray-50 min-h-screen px-2 md:px-4">
      {/* Header handled by App.tsx */}

      {/* Hero Section */}
      <section className="bg-[#FAD1D8] p-10 text-center rounded-2xl my-6">
        <h1 className="text-6xl font-bold text-[#B73852]">PharmaYap</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-[#6B2C3B]">
          En PharmaYap, hacemos que cuidar tu salud sea más fácil...
        </p>
      </section>

      {/* Categories and Product List Section */}
      <section className="py-10 px-4 bg-white rounded-2xl mb-6">
        <h2 className="text-2xl font-bold text-[#B73852] mb-4">
          Explorar por categoría
        </h2>
        <CategoryFilter
          categories={availableCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ProductList
          products={filteredProducts}
          onProductClick={(product) => {
            setSelectedProduct(product);
            console.log('HomePage: selectedProduct is now', product); // Add this
            // You can also add scroll to view here if you want:
            if (detailRef.current) {
              detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Product Detail Section - Only render the imported component here */}
      {selectedProduct && (
        
        <ProductDetail
          ref={detailRef} // Pass the ref
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          detailRef={detailRef} // Pass detailRef if needed internally for scroll behavior
          // Pass cart-related props to ProductDetail
          productInCart={productInCartForDetail}
          onAddToCart={handleAddToCart}
          onIncrementCart={handleIncrementCart}
          onDecrementCart={handleDecrementCart}
          onRemoveFromCart={handleRemoveFromCart}
          onPurchaseClick={() => setShowPurchaseTypeModal(true)} // Trigger purchase modal
        />
      )}

      {/* Modals (Conditionally Rendered) */}
      <PurchaseTypeModal
        showModal={showPurchaseTypeModal}
        onClose={() => setShowPurchaseTypeModal(false)}
        purchaseType={purchaseType}
        onSetPurchaseType={setPurchaseType}
        address={address}
        additionalReferences={additionalReferences}
        numeroEncontrado={numeroEncontrado}
        onOpenAddressModal={handleOpenAddressModal}
        onSavePreferences={() => {
          if (purchaseType === "domicilio" && !address) {
            alert("Por favor, selecciona una dirección para el despacho a domicilio.");
            return;
          }
          setShowPurchaseTypeModal(false);
          setShowConfirmation(true);
        }}
      />

      <AddressModal
        showModal={showAddressModal}
        onClose={handleCloseAddressModal}
        setAddress={setAddress}
        setAdditionalReferences={setAdditionalReferences}
        setNumeroEncontrado={setNumeroEncontrado}
        onSaveAddress={handleSaveAddress}
        currentAddress={address}
      />

      <CartModal
        showModal={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cartItems}
        getCartTotal={getCartTotal}
      />

      <ConfirmationModal
        showModal={showConfirmation}
        onGenerateBoleta={handleGenerateBoleta}
        onClose={() => setShowConfirmation(false)}
      />

      {/* Footer handled by App.tsx */}
    </div>
  );
};

export default HomePage;