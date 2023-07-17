import { createContext, useState } from "react";

export const CartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //update localStorage
  const updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const addCart = (product) => {
    setCart((currentItems) => {
      const existingCartItem = currentItems.find(
        (cartItem) => cartItem._id === product._id
      );

      if (existingCartItem) {
        return currentItems.map((cartItem) => {
          return cartItem._id === product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } //si existe agrega uno a la cantidad del mismo item
            : cartItem;
        });
      }
      return [...currentItems, { ...product, quantity: 1 }]; // si no existe suma el nuevo item
    });
    updateLocalStorage();
  };

  const removeToCart = (product) => {
    setCart((currentItems) => {
      const existingCartItem = currentItems.find(
        (cartItem) => cartItem._id === product._id
      );

      if (existingCartItem.quantity === 1) {
        return currentItems.filter((cartItem) => cartItem._id !== product._id);
      }
      return currentItems.map((cartItem) => {
        return cartItem._id === product._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem;
      });
    });

    updateLocalStorage();
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addCart, removeToCart, cleanCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
