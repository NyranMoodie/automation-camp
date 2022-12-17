import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Skeleton,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Layout from "../../components/Layout";
import { products } from "../../data/products";
import { PageWithLayout } from "../../modules/Layout";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { useFavorites } from "../../context/FavorateContext";

const SelectedProduct: PageWithLayout = ({ product }: any) => {
  const [count, setCount] = useState({ id: "", quantity: 1 });
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const toast = useToast();
  return (
    <Container maxW={"7xl"}>
      <Stack py={6} spacing={4} direction={"column"}>
        <HStack
          onClick={() => {
            history.back();
          }}
          _hover={{ cursor: "pointer" }}
        >
          <BiArrowBack fontSize={30} />
          <Heading size={"md"}>Back to products</Heading>
        </HStack>
        <SimpleGrid columns={[1, 2]} spacing={4}>
          <Carousel>
            <div>
              <img src={product?.image} />
              <p className="legend">Image 1</p>
            </div>
            <div>
              <img src={product?.image2} />
              <p className="legend">Image 2</p>
            </div>
          </Carousel>
          <Stack spacing={4}>
            <HStack>
              <Heading>{product?.name} </Heading>
              {favorites?.find((id: any) => id === product.id) ? (
                <Box _hover={{ cursor: "pointer" }}>
                  <AiFillStar
                    color="#F1C40F"
                    id={"remove-from-favorite"}
                    fontSize={30}
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
                  />
                </Box>
              ) : (
                <Box _hover={{ cursor: "pointer" }}>
                  <AiOutlineStar
                    fontSize={30}
                    id={"add-to-favorite"}
                    onClick={() => {
                      addToFavorites(product.id);
                      toast({
                        title: `${product.name} added to favorites`,
                        variant: "subtle",
                        status: "success",
                        position: "top-right",
                        duration: 10000,
                        isClosable: true,
                      });
                    }}
                  />
                </Box>
              )}
            </HStack>

            <Text>{product?.description}</Text>

            <HStack>
              <Text>Price : </Text>
              <Text>${product?.price}</Text>
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
                <NumberIncrementStepper id={`product-increase`} />
                <NumberDecrementStepper id={`product-decrease`} />
              </NumberInputStepper>
            </NumberInput>
            <HStack>
              <Text>Category : </Text>
              <Tag variant={"outline"} colorScheme={"teal"}>
                {product?.category}
              </Tag>
            </HStack>

            <Box>
              <Button
                id={"add-to-cart"}
                className="snipcart-add-item"
                data-item-id={product?.id}
                data-item-price={product?.price}
                data-item-description={product?.description}
                data-item-url={`/api/products/${product?.id}`}
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
            </Box>
          </Stack>
        </SimpleGrid>
        <Heading>Related Products</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} pb={6}>
          {products
            ?.filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .map((product, index) => {
              return (
                <Stack key={index} borderRadius={"lg"}>
                  <Link href={`/products/${product.id}`}>
                    <Box position="relative" _hover={{ cursor: "pointer" }}>
                      <AspectRatio ratio={4 / 3}>
                        <Image
                          src={product.image}
                          draggable="false"
                          fallback={<Skeleton />}
                          borderRadius={"xl"}
                        />
                      </AspectRatio>
                    </Box>
                  </Link>

                  <Stack>
                    <Stack spacing="1">
                      <Text fontWeight="medium" color={"gray.400"}>
                        {product.name}
                      </Text>
                      <HStack>
                        <Text>${product.price}</Text>
                        <Tag variant={"outline"} colorScheme={"teal"}>
                          {product.category}
                        </Tag>
                      </HStack>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export async function getStaticProps({ params }: any) {
  const { id: productId } = params;
  const product = products.find(({ id }) => id === productId);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: products.map(({ id }) => {
      return {
        params: {
          id: id,
        },
      };
    }),
    fallback: false,
  };
}

SelectedProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SelectedProduct;
