//import { useAuth } from "../context/AuthContext";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  // const { logout } = useAuth();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bgImage="url(/public/homeBack.jpg)"
      bgSize="cover"
    >
      <Link to="/catalogo">
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading size="4xl" color="white" marginBottom={10}>
            Vestite como mas te guste
          </Heading>
          <Button>Empezar A Comprar</Button>
        </Flex>
      </Link>
    </Flex>
  );
}

export default Home;
