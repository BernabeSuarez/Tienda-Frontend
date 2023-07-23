import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Flex, Grid, GridItem, Heading, Skeleton } from "@chakra-ui/react";

const productsUrl = "https://backend-tienda-nucba.onrender.com/products";

function Catalogo() {
  const [dataProd, setDataProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [select, setSelect] = useState();

  let productsItems = dataProd;
  if (select) {
    //filtrar productos por categoria
    productsItems = productsItems.filter((item) => item.section === select);
  }

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
      <Heading marginBottom="1rem">Catalogo de Productos</Heading>
      <select
        onChange={(event) => setSelect(event.target.value)}
        style={{ marginBottom: "2rem" }}
      >
        <option value="" selected disabled hidden>
          CATALOGO
        </option>
        <option value="Accesorios">REMERAS</option>
        <option value="Calzado">CALZADO</option>
        <option value="Gorras">GORRAS</option>
        <option value="Buzos">BUZOS</option>
        <option value="">CATALOGO COMPLETO</option>
      </select>
      {isLoading ? (
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={6}
          w="100%"
        >
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
          <Skeleton height="250px" width="280px" />
        </Grid>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={6}
          w="full"
        >
          {productsItems.map((prod) => (
            <GridItem w="100%" h="40%" key={prod.id}>
              <ProductCard product={prod} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default Catalogo;
