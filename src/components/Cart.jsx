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
  useToast,
} from "@chakra-ui/react";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
//import { useNavigate } from "react-router-dom";

export default function Cart({ isOpen, onClose }) {
  const { cart, removeToCart, addCart, cleanCart, createOrder, payOrder } =
    useCart();
  const { user } = useAuth();
  const toast = useToast();
  //const navigate = useNavigate();

  const TotalItems = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const confirmarCompra = async () => {
    await payOrder({
      title: user.name,
      unit_price: TotalItems,
      description: `Pedido realizado por: ${user.email}`,
      category_id: user._id,
    }).then(
      toast({
        title: "Orden creada",
        description: "Gracias por comprar en Tienda Online",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    );
    await createOrder(user, cart, TotalItems);
    //primero pagar con mercadopago en un modal  y luego cargar la order
  };

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
                <Button
                  variant="outline"
                  colorScheme="cyan"
                  onClick={() => confirmarCompra()}
                >
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
