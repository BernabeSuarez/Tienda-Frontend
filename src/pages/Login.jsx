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
  Text,
} from "@chakra-ui/react";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);

  const login = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
    navigate("/catalogo");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgImage="url(/loginBack.jpg)"
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
        <Heading color="black">Bienvenidos</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={(e) => login(e, email, password)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="dark-lg"
              borderRadius={12}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email"
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
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>

      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="sm">Aun no tienes cuenta?</Text>
        <Link to="/register">
          <Text fontSize="xl">Registrarse</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
