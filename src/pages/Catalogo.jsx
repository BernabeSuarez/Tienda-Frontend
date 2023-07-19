import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react";

const productsUrl = "https://backend-tienda-nucba.onrender.com/products";

function Catalogo() {
  const [dataProd, setDataProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (await fetch(productsUrl)).json();

      // set state when the data received
      setDataProd(data);
      setIsLoading(false);
    };

    dataFetch();
  }, []);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <h2>Catalogo de Productos</h2>
      <Link to="/">Home</Link>
      {isLoading ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
        </Grid>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
          {dataProd.map((prod) => (
            <GridItem w="70%" h="70%" key={prod.id}>
              <ProductCard product={prod} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default Catalogo;
