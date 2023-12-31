import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

export default function ProductModal({ isOpen, onClose, product }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="rgba(0,0,0,0.5)"
          backdropFilter="blur(4px) hue-rotate(150deg)"
        />
        <ModalContent p={4}>
          <ModalHeader>{product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/*cuerpo del modal*/}</ModalBody>
          <Text>{product.description}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${product.price}
          </Text>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Agregar al carrito
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
