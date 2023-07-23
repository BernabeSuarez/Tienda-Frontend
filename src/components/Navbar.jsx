import {
  Flex,
  Text,
  Icon,
  Box,
  Image,
  Spacer,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import Cart from "./Cart";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Flex
      h="60px"
      bg="black"
      color="white"
      p="0 3%"
      w="100%"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Box
        w="30%"
        onClick={() => navigate("/catalogo")}
        _hover={{ cursor: "pointer" }}
      >
        <Image src="img/logoTienda.png" alt="Logo" w="250px" />
      </Box>
      <Spacer />

      <Flex justifyContent="space-between" alignItems="center" w="20%">
        {user ? (
          <>
            <Text>Hola! {user.name}</Text>
            <Button
              onClick={() => logout()}
              colorScheme="teal"
              variant="outline"
              size="sm"
            >
              Salir
            </Button>
          </>
        ) : null}
        <Box pos="relative" display="inline-block">
          <Icon as={BsCart3} _hover={{ cursor: "pointer" }} onClick={onOpen} />
          <Box
            pos="absolute"
            top="-1px"
            right="-1px"
            px={1}
            py={0.5}
            fontSize="xs"
            fontWeight="bold"
            lineHeight="none"
            color="red.100"
            transform="translate(50%,-50%)"
            bg="red.600"
            rounded="full"
          >
            {quantity}
          </Box>
        </Box>
      </Flex>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
