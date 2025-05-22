import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import { allProducts, categories } from "../data/products";
import "../index.css";

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<null | typeof allProducts[0]>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const detailRef = React.useRef<HTMLDivElement>(null); // <-- aquí es importante

  const filteredProducts = selectedCategory === "Todos"
    ? allProducts
    : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen px-2 md:px-4">

      {/* Hero */}
      <section className="bg-[#FAD1D8] p-10 text-center rounded-2xl mb-6">
        <h1 className="text-6xl font-bold text-[#B73852]">PharmaYap</h1>
        <p className="max-w-xl mx-auto mt-4 text-lg text-[#6B2C3B]">
          En PharmaYap, hacemos que cuidar tu salud sea más fácil...
        </p>
      </section>

      {/* Categorías */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Lista de Productos */}
      <ProductList
        products={filteredProducts}
        setSelectedProduct={setSelectedProduct}
        detailRef={detailRef}
      />

      {/* Detalles del Producto */}
      <ProductDetail
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        detailRef={detailRef}
      />

    </div>
  );
};

export default HomePage;
