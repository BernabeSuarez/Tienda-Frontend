import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Table,
  Td,
  Tr,
  Tbody,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/useCart";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Cart({ isOpen, onClose }) {
  const { cart, removeToCart, addCart, cleanCart } = useCart();
  console.log(cart);
  const TotalItems = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrito de compras</DrawerHeader>

          <DrawerBody>
            <Table
              w="full"
              bg="white"
              _dark={{ bg: "gray.800" }}
              display={{
                base: "block",
                md: "table",
              }}
              sx={{
                "@media print": {
                  display: "table",
                },
              }}
            >
              <Tbody
                display={{
                  base: "block",
                  lg: "table-row-group",
                }}
                sx={{
                  "@media print": {
                    display: "table-row-group",
                  },
                }}
              >
                {cart.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>Cant: {item.quantity}</Td>
                    <Td>{formatPrice(item.price * item.quantity)}</Td>

                    <Td>
                      <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          icon={<AiOutlinePlusCircle />}
                          aria-label="Up"
                          onClick={() => addCart(item)}
                        />
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          icon={<AiOutlineMinusCircle />}
                          aria-label="Edit"
                          onClick={() => removeToCart(item)}
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button onClick={() => cleanCart()}>Limpiar Carro</Button>
            <h2>Total: {formatPrice(TotalItems)} </h2>
          </DrawerBody>

          <DrawerFooter>
            <h3>Footer del carrito</h3>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
