import { createContext, useState } from "react";

export const CartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addCart }}>
      {children}
    </CartContext.Provider>
  );
};
