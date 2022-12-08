import Head from "next/head";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFavorites } from "../context/FavorateContext";
import { PageWithLayout } from "../modules/Layout";
import { Product } from "../modules/product";
import { products } from "../data/products";
import { CgUnavailable } from "react-icons/cg";
import {
  SimpleGrid,
  Stack,
  AspectRatio,
  Skeleton,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  Button,
  Text,
  Box,
  Image,
  useToast,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Favorites: PageWithLayout = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [count, setCount] = useState({ id: "", quantity: 1 });
  const [filteredList, setFiltered] = useState<Product[]>(products);
  const toast = useToast();
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="Nyran Moodie - Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={"7xl"}>
        <Heading py={6} color={"teal"}>
          Favorites
        </Heading>
        {favorites.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} pb={6}>
            {filteredList
              .filter((item) => favorites.indexOf(item.id) !== -1)
              ?.map((product, index) => {
                return (
                  <Stack key={index} borderRadius={"lg"}>
                    <Link href={`/products/${product.id}`}>
                      <Box position="relative" _hover={{ cursor: "pointer" }}>
                        <AspectRatio ratio={4 / 3}>
                          <Image
                            src={product.image}
                            _hover={{ opacity: 0.8, transition: "1.3s" }}
                            onMouseOver={(e): void => {
                              product.image2 &&
                                (e.currentTarget.src = product.image2);
                            }}
                            onMouseOut={(e): void => {
                              product.image2 &&
                                (e.currentTarget.src = product.image || "");
                            }}
                            draggable="false"
                            fallback={<Skeleton />}
                            borderRadius={"xl"}
                          />
                        </AspectRatio>
                      </Box>
                    </Link>

                    <Stack>
                      <Stack spacing="1">
                        <HStack justifyContent={"space-between"}>
                          <Text fontWeight="medium" color={"gray.400"}>
                            {product.name}
                          </Text>

                          <Button
                            size={"xs"}
                            colorScheme={"red"}
                            id={"remove-favorite-btn"}
                            onClick={() => {
                              removeFromFavorites(product.id);
                              toast({
                                title: `${product.name} removed from favorites`,
                                variant: "subtle",
                                status: "error",
                                position: "top-right",
                                duration: 10000,
                                isClosable: true,
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </HStack>

                        <NumberInput
                          w={"70px"}
                          defaultValue={1}
                          size="xs"
                          min={1}
                          max={20}
                          onChange={(e, value) => {
                            setCount({ id: product.id, quantity: value });
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <HStack pt={"1"}>
                          <Text>${product.price}</Text>
                          <Tag variant={"outline"} colorScheme={"teal"}>
                            {product.category}
                          </Tag>
                        </HStack>
                      </Stack>
                    </Stack>

                    <Button
                      id={"add-to-cart"}
                      className="snipcart-add-item"
                      data-item-id={product?.id}
                      data-item-price={product?.price}
                      data-item-description={product?.description}
                      data-item-url={`/products/${product?.id}`}
                      data-item-image={product?.image}
                      data-item-name={product?.name}
                      data-item-quantity={
                        product?.id === count.id ? count.quantity : 1
                      }
                      leftIcon={<AiOutlineShoppingCart />}
                      colorScheme={"teal"}
                    >
                      Add To Cart
                    </Button>
                  </Stack>
                );
              })}
          </SimpleGrid>
        ) : (
          <VStack>
            <CgUnavailable fontSize={60} color={"teal"} />
            <Heading color={"teal"}>No favorites added!</Heading>
            <Text color={"gray.600"}>
              You can add favorites from the home page.
            </Text>
          </VStack>
        )}
      </Container>
    </>
  );
};

Favorites.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Favorites;
