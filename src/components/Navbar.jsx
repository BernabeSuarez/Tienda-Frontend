import {
  Flex,
  Icon,
  Box,
  Image,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCart3, BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import Cart from "./Cart";
import { useCart } from "../context/useCart";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();

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
      <Box w="30%">
        <Image src="img/logoTienda.png" alt="Logo" w="250px" />
      </Box>
      <Spacer />
      <Flex justifyContent="space-between" alignItems="center" w="10%">
        <Icon as={BsSearch} _hover={{ cursor: "pointer" }} />
        <Icon as={BiUser} _hover={{ cursor: "pointer" }} />
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
