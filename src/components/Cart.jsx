import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export default function Cart({ isOpen, onClose }) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito de compras</DrawerHeader>

          <DrawerBody>
            <h2>Aca van los productos</h2>
          </DrawerBody>

          <DrawerFooter>
            <h3>Footer del carrito</h3>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
