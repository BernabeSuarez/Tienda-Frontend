import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Divider,
  CardFooter,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillCartPlusFill } from "react-icons/bs";
import ProductModal from "./ProductModal";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addCart, cart } = useCart();

  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <>
      <Card
        size="sm"
        transition="0.5s ease"
        colorScheme="blackAlpha"
        bg="blackAlpha.300"
        variant="outline"
        align="center"
      >
        <CardBody overflow="hiden">
          <Box overflow="hidden" key={product.id}>
            <Image
              boxSize="100%"
              src={product.img.secure_url}
              alt={product.name}
              borderRadius="lg"
              objectFit="cover"
              transition="0.5s ease"
              filter="grayscale(55%)"
              _hover={{ transform: "scale(1.2)", filter: "grayscale(0%)" }}
            />
          </Box>
          <Stack mt="2" spacing="1">
            <Heading size="md">{product.name}</Heading>
            <Text color="black.600" fontSize="xl">
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup>
            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
              Detalle
            </Button>
            <IconButton
              variant="outline"
              colorScheme="blue"
              onClick={() => addCart(product)}
              icon={<BsFillCartPlusFill />}
            ></IconButton>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
}
