import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Flex } from "@chakra-ui/react";

function Catalogo() {
  return (
    <Flex flexDirection="column">
      <Navbar />
      <h2>About</h2>
      <Link to="/">Home</Link>
      <Link to="/cart">tu Carrito</Link>
    </Flex>
  );
}

export default Catalogo;
