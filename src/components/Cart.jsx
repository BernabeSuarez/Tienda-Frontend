import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart({ isOpen, onClose }) {
  const [cart, setCart] = useContext(CartContext);
  console.log(cart);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito de compras</DrawerHeader>

          <DrawerBody>
            {cart.map((item) => (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <h4>cant: {item.quantity}</h4>
              </div>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <h3>Footer del carrito</h3>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
