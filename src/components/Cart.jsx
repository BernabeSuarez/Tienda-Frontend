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
  Th,
  Td,
  Tr,
  Tbody,
  IconButton,
  ButtonGroup,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/useCart";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Cart({ isOpen, onClose }) {
  const { cart, removeToCart, addCart, cleanCart } = useCart();

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
            {cart.length === 0 ? (
              <h2>No hay Nada aun...</h2>
            ) : (
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
                  <Tr>
                    <Th>Producto</Th>
                    <Th>Precio Total</Th>
                    <Th>Cantidad</Th>
                    <Th>Agregar/Quitar</Th>
                  </Tr>
                  {cart.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{formatPrice(item.price * item.quantity)}</Td>

                      <Td>{item.quantity}</Td>
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
            )}
          </DrawerBody>

          <DrawerFooter>
            {cart.length > 0 ? (
              <ButtonGroup>
                <Button colorScheme="red" onClick={() => cleanCart()}>
                  Limpiar Carro
                </Button>
                <Button variant="outline" colorScheme="cyan">
                  Confirmar compra
                </Button>
              </ButtonGroup>
            ) : null}
            <Spacer />
            <Text>Total a pagar: {formatPrice(TotalItems)} </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
