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
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useContext(CartContext);

  const addCart = () => {
    setCart((currentItem) => {
      const itemFound = currentItem.find((item) => item.id === product.id);
      if (itemFound) {
        return currentItem.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currentItem, { quantity: 1, product }];
      }
    });
  };
  return (
    <>
      <Card
        maxW="sm"
        transition="0.5s ease"
        _hover={{ transform: "scale(1.05)" }}
      >
        <CardBody overflow="hiden">
          <Box overflow="hidden" key={product.id}>
            <Image
              src="fotico" //{product.img}
              alt={product.name}
              borderRadius="lg"
              objectFit="cover"
              transition="0.5s ease"
              filter="contrast(80%)"
              _hover={{ transform: "scale(1.2)" }}
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text>{product.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
              Detalle
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={addCart}>
              Agregar al Carrito
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <ProductModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
}
