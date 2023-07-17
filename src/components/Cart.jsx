import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { useCart } from "../context/useCart";

export default function Cart({ isOpen, onClose }) {
  const { cart, removeToCart, addCart, cleanCart } = useCart();
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
                <Button onClick={() => addCart(item)}>+</Button>
                <Button onClick={() => removeToCart(item)}>-</Button>
              </div>
            ))}
            <Button onClick={() => cleanCart()}>Limpiar Carro</Button>
          </DrawerBody>

          <DrawerFooter>
            <h3>Footer del carrito</h3>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
