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
  Select,
  HStack,
  Tag,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { products } from "../../data/products";
import Hero from "../../components/Hero";
import Link from "next/link";
import {
  AiFillStar,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { PageWithLayout } from "../../modules/Layout";
import { Product } from "../../modules/product";
import { useFavorites } from "../../context/FavorateContext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Home: PageWithLayout = () => {
  const [categorySearch, setCategorySearch] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [count, setCount] = useState({ id: "", quantity: 1 });
  const [filteredList, setFiltered] = useState<Product[]>(products);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const toast = useToast();

  useEffect(() => {
    setFiltered(
      products
        .filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter((product) => product.category.includes(categorySearch))
        //@ts-ignore
        .sort((a, b) => {
          if (sortFilter === "lowToHigh") {
            return a.price - b.price;
          }
          if (sortFilter === "highToLow") {
            return b.price - a.price;
          }
          if (sortFilter === "aToZ") {
            return a.name.localeCompare(b.name);
          }
          if (sortFilter === "zToA") {
            return b.name.localeCompare(a.name);
          }
        })
    );
  }, [searchValue, categorySearch, sortFilter]);

  return (
    <Box mt={-20}>
      <Head>
        <title>Automation Camp Store</title>
        <meta name="description" content="Store" />
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
              <FormLabel>Sort Options</FormLabel>
              <Select
                value={sortFilter}
                id={"sort"}
                onChange={(e) => {
                  setSortFilter(e.target.value);
                }}
                placeholder="Select option"
              >
                <option value="lowToHigh">Low to high</option>
                <option value="highToLow">High to low</option>
                <option value="aToZ">A to Z</option>
                <option value="zToA">Z to A</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Search</FormLabel>
              <Input
                value={searchValue}
                id={"search"}
                onChange={(e: any) => {
                  setSearchValue(e.target.value);
                }}
                placeholder="Search by name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={categorySearch}
                id={"category"}
                onChange={(e) => {
                  setCategorySearch(e.target.value);
                }}
                placeholder="Select category"
              >
                <option value="shirt">Shirts</option>
                <option value="pant">Pants</option>
                <option value="hat">Hats</option>
                <option value="shoes">Shoes</option>
                <option value="couch">Couch/Sofa</option>
                <option value="laptop">Laptops</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Reset Filters</FormLabel>
              <Button
                leftIcon={<AiOutlineClose />}
                id={"reset"}
                onClick={() => {
                  setCategorySearch("");
                  setSearchValue("");
                  setSortFilter("");
                }}
              >
                Reset
              </Button>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} pb={6}>
            {filteredList?.map((product, index) => {
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

                        {/* {favorites?.find((id: any) => id === product.id) ? (
                          <Box _hover={{ cursor: "pointer" }}>
                            <AiFillStar
                              color="#F1C40F"
                              id={"remove-from-favorite"}
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
                        )} */}
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
        </Container>
      </Box>
    </Box>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;

export const getServerSideProps = withPageAuthRequired();
