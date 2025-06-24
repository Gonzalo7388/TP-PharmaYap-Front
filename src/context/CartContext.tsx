// src/context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Assuming Producto type is defined in your project.
// Adjust the import path if your Producto type is in a different location.
import { Producto } from '../data/products'; // Example path, adjust as needed

// Define the structure for a single item within the cart
interface CartItem {
  product: Producto;
  quantity: number;
}

// Define the shape of the context's value (what will be provided to consumers)
interface CartContextType {
  cartItems: CartItem[];
  handleAddToCart: (product: Producto) => void;
  handleIncrementCart: (productId: number) => void;
  handleDecrementCart: (productId: number) => void;
  handleRemoveFromCart: (productId: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

// Create the context with an initial undefined value.
// It will be provided a value by the CartProvider.
const CartContext = createContext<CartContextType | undefined>(undefined);

// The CartProvider component wraps parts of your application that need cart access.
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add a product to the cart or increment its quantity
  const handleAddToCart = (product: Producto) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Function to increment the quantity of an item already in the cart
  const handleIncrementCart = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrement the quantity of an item in the cart, or remove it if quantity becomes 0
  const handleDecrementCart = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.reduce((acc, item) => {
        if (item.product.id === productId) {
          if (item.quantity - 1 > 0) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]) // Ensure initial accumulator type
    );
  };

  // Function to remove an item completely from the cart
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Function to calculate the total price of all items in the cart
  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // The value provided by the context
  const contextValue: CartContextType = {
    cartItems,
    handleAddToCart,
    handleIncrementCart,
    handleDecrementCart,
    handleRemoveFromCart,
    getCartTotal,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};