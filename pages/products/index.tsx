import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  SimpleGrid,
  AspectRatio,
  Skeleton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Head from "next/head";
import products from "../../data/products.json";
import Hero from "../../components/Hero";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import Layout from "../../components/Layout";
import { PageWithLayout } from "../../modules/Layout";
const Home: PageWithLayout = () => {
  const [searchValue, setSearchValue] = useState("");

  products.sort((a, b) => a.price - b.price);
  return (
    <Box mt={-20}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box px={8} py={24} mx="auto">
        <Hero />
        <Container maxW={"7xl"}>
          <Heading color={"teal"} py={4}>
            Products
          </Heading>
          <SimpleGrid
            spacing={4}
            py={4}
            columns={[1, 2, 3, 4]}
            alignItems={"center"}
          >
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input
                onChange={(e: any) => {
                  setSearchValue(e.target.value);
                }}
                placeholder="Enter name"
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} pb={6}>
            {products
              ?.filter((product) => {
                if (searchValue == "") {
                  return product;
                } else if (product.name.toLowerCase().includes(searchValue)) {
                  return product;
                }
              })
              .map((product, index) => {
                return (
                  <Stack key={index} borderRadius={"lg"}>
                    <Link href={`/products/${product.id}`}>
                      <Box position="relative">
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
                        <Text>${product.price}</Text>
                      </Stack>
                    </Stack>

                    <Button
                      className="snipcart-add-item"
                      data-item-id={product?.id}
                      data-item-price={product?.price}
                      data-item-description={product?.description}
                      data-item-url={`/products/${product?.id}`}
                      data-item-image={product?.image}
                      data-item-name={product?.name}
                      leftIcon={<AiOutlineShoppingCart />}
                      colorScheme={"teal"}
                    >
                      Add To Cart
                    </Button>
                  </Stack>
                );
              })}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
