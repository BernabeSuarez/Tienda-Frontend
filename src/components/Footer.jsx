import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  Divider,
  Icon,
} from "@chakra-ui/react";

import { GrInstagram } from "react-icons/gr";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <Box bg="#2D3748" color="white">
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        w="full"
        justify="space-between"
        p={10}
      >
        <Flex justify="center">
          <Image
            src="img/logoTienda.png"
            alt="Company Logo"
            rounded="lg"
            width={{
              base: "150px",
              lg: "300px",
            }}
            height={{
              base: "75px",
              lg: "15 0px",
            }}
            my={{
              base: 2,
              lg: 0,
            }}
          />
        </Flex>
        <HStack
          alignItems="center"
          flex={1}
          justify="space-around"
          fontSize={{
            base: "12px",
            md: "16px",
          }}
          color="white"
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          <Flex justify="start" direction="column">
            <Text>Envios a todo el pais</Text>
            <Text>Aceptamos todas las tarjetas</Text>
          </Flex>
        </HStack>
        <HStack
          alignItems="center"
          flex={1}
          justify="space-around"
          fontSize={{
            base: "12px",
            md: "16px",
          }}
          color="white"
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          <Flex justify="start" direction="column">
            <Text>Consulte precios por mayor</Text>
            <Text>Seguinos en todas las redes</Text>
          </Flex>
        </HStack>
      </Stack>
      <Divider
        w="95%"
        mx="auto"
        color="gray.600"
        _dark={{
          color: "#F9FAFB",
        }}
        h="3.5px"
      />
      <VStack py={3}>
        <HStack justify="center">
          <Link>
            <Icon color="white" h="20px" w="20px" as={FaFacebookF} />
          </Link>
          <Link>
            <Icon color="white" h="20px" w="20px" as={FiTwitter} />
          </Link>
          <Link>
            <Icon
              _dark={{
                color: "white",
              }}
              h="20px"
              w="20px"
              as={GrInstagram}
            />
          </Link>
          <Link>
            <Icon
              _dark={{
                color: "white",
              }}
              h="20px"
              w="20px"
              as={FaLinkedinIn}
            />
          </Link>
        </HStack>

        <Text
          textAlign="center"
          fontSize="smaller"
          _dark={{
            color: "white",
          }}
        >
          &copy;Copyright. 2023 - All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
}
