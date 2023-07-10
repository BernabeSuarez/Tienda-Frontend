import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Register() {
  const { createUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);
  const toast = useToast();

  const login = async (e) => {
    e.preventDefault();
    await createUser(name, email, password);
    toast({
      title: "Bienvenido!",
      description: "Que alegria tenerlos en nuestra tienda",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgImage="url(/public/loginBack.jpg)"
      bgSize="cover"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="black" />
        <Heading color="black">Bienvenido</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={(e) => login(e, name, email, password)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Correo Electronico"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"></FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bg="black"
                color="white"
                width="full"
                _hover={{ bg: "gray.600" }}
              >
                Crear Usuario
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          Ya tienes Cuenta?{" "}
          <Link color="teal.500" to="/login">
            Ingresar
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
}
