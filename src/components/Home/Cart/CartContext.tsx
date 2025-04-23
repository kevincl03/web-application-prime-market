// context/CartContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateQuantity: (_id: string, type: "increment" | "decrement") => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  cartSummary: {
    totalItems: number;
    totalPrice: number;
    tax: number;
    grandTotal: number;
  };
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const isExist = prev.find((p) => p._id === product._id);
      if (isExist) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (_id: string, type: "increment" | "decrement") => {
    setCart((prev) =>
      prev.map((product) =>
        product._id === _id
          ? {
              ...product,
              quantity: product.quantity + (type === "increment" ? 1 : -1),
            }
          : product
      )
    );
  };

  const removeFromCart = (_id: string) => {
    setCart((prev) => prev.filter((product) => product._id !== _id));
  };

  const clearCart = () => setCart([]);

  const cartSummary = {
    totalItems: cart.reduce((total, product) => total + product.quantity, 0),
    totalPrice: cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    ),
    tax: cart.reduce(
      (total, product) => total + product.price * product.quantity * 0.1,
      0
    ),
    grandTotal: cart.reduce(
      (total, product) => total + product.price * product.quantity * 1.1, // Including tax
      0
    ),
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
