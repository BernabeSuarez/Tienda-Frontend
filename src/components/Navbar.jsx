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

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Icon as={BsCart3} _hover={{ cursor: "pointer" }} onClick={onOpen} />
      </Flex>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
