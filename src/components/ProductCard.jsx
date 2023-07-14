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
} from "@chakra-ui/react";

export default function ProductCard({ product }) {
  return (
    <Card
      maxW="sm"
      transition="0.5s ease"
      _hover={{ transform: "scale(1.05)" }}
    >
      <CardBody overflow="hiden">
        <Box overflow="hidden">
          <Image
            src={product.img}
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
          <Button variant="solid" colorScheme="blue">
            Comprar
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Agregar al Carrito
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
