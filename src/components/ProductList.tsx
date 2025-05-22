import React from "react";
import { Producto } from "../data/products";

interface ProductListProps {
    products: Producto[];
    setSelectedProduct: (product: Producto) => void;
    detailRef: React.RefObject<HTMLDivElement | null>;
}


const ProductList: React.FC<ProductListProps> = ({ products, setSelectedProduct, detailRef }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
            <div
                key={product.id}
                onClick={() => {
                    setSelectedProduct(product);
                    setTimeout(() => {
                        detailRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }}
                className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
                <img src={product.image} alt={product.name} className="h-36 w-full object-cover rounded-t-xl" />
                <div className="p-4 flex flex-col justify-between h-40">
                    <div>
                        <p className="text-base font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-green-600 font-bold text-lg">S/. {product.price}</span>
                        <button className="text-sm border px-3 py-1 rounded-full hover:bg-gray-800 hover:text-white">
                            + Agregar
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default ProductList;
