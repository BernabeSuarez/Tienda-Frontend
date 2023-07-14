import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Flex, Grid, GridItem } from "@chakra-ui/react";

const productsUrl = "http://localhost:8080/products";

function Catalogo() {
  const [dataProd, setDataProd] = useState([]);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (await fetch(productsUrl)).json();

      // set state when the data received
      setDataProd(data);
    };

    dataFetch();
  }, []);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Navbar />
      <h2>About</h2>
      <Link to="/">Home</Link>
      <Link to="/cart">tu Carrito</Link>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} w="80%">
        {dataProd.map((prod) => (
          <GridItem w="100%" key={prod.id}>
            <ProductCard product={prod} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

export default Catalogo;
