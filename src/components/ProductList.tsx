// src/components/ProductList.tsx
import React from 'react';
import { Producto } from '../data/products'; // Adjust path if needed

interface ProductListProps {
  products: Producto[];
  onProductClick: (product: Producto) => void;
  onAddToCart: (product: Producto) => void; // New prop for adding to cart from the list
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map(product => (
        <div
          key={product.id}
          // The main card div, when clicked, will open the product detail
          onClick={() => onProductClick(product)}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          {/* Ensure your image source is correct, e.g., using product.image */}
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 truncate max-h-12 overflow-hidden">{product.description}</p> {/* Added truncate/max-h for consistent card size */}
            <p className="text-xl font-semibold text-green-600">S/. {product.price.toFixed(2)}</p> {/* Changed color to green as in image */}

            {/* "+ Agregar" button for direct add to cart */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // VERY IMPORTANT: Prevents the parent div's onClick from firing
                onAddToCart(product); // Call the new prop function
                alert(`${product.name} ha sido agregado al carrito.`); // Optional: User feedback
              }}
              className="mt-3 px-4 py-2 border border-gray-400 text-gray-800 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center ml-auto mr-0" // Tailwinds for button as in image
              // Added ml-auto and mr-0 to push button to the right as in the image
              style={{ width: 'fit-content' }} // Adjust width as needed
            >
              + Agregar
            </button>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <p className="col-span-full text-center text-gray-600 py-8">No se encontraron productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ProductList;