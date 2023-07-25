import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

const orderUrl = "https://backend-tienda-nucba.onrender.com/order";
const payUrl = "https://backend-tienda-nucba.onrender.com/payment";

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

  const createOrder = async (user, cart, price) => {
    try {
      const res = await axios.post(orderUrl, {
        user,
        cart,
        price,
      });
      console.log(res.data); //eliminar luego
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const payOrder = async (order) => {
    axios
      .post(payUrl, order)
      .then((res) => (window.location.href = res.data.response.body.init_point))
      .catch((err) => console.log(err));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addCart,
        removeToCart,
        cleanCart,
        createOrder,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
