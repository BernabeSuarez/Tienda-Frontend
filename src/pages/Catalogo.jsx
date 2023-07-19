import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react";

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
      <h2>Catalogo de Productos</h2>
      <Link to="/">Home</Link>
      <select onChange={(event) => setSelect(event.target.value)}>
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
          {productsItems.map((prod) => (
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
