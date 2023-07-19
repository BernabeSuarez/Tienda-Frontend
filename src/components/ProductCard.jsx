import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Divider,
  CardFooter,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import ProductModal from "./ProductModal";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addCart, cart } = useCart();

  localStorage.setItem("cart", JSON.stringify(cart));

  return (
    <>
      <Card maxW="sm" transition="0.5s ease">
        <CardBody overflow="hiden">
          <Box overflow="hidden" key={product.id}>
            <Image
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
            <Text>{product.description}</Text>
            <Text color="blue.600" fontSize="xl">
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="1">
            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
              Detalle
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => addCart(product)}
            >
              Agregar al Carrito
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
}
