import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <Flex flexDirection="column">
      <Navbar />
      <Flex p={2} w="100%" justifyContent="center" alignItems="center">
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
}
