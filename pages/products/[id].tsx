import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Layout from "../../components/Layout";
import products from "../../data/products.json";
import { PageWithLayout } from "../../modules/Layout";
const SelectedProduct: PageWithLayout = () => {
  const router = useRouter() as any;
  const { id } = router.query;
  const product = products.find((element) => element?.id === id);
  return (
    <Container maxW={"7xl"}>
      <Stack py={6} spacing={4} direction={"column"}>
        <HStack
          onClick={() => {
            history.back();
          }}
        >
          <BiArrowBack fontSize={30} />
          <Heading size={"md"}>Back to products</Heading>
        </HStack>
        <SimpleGrid columns={[1, 2]} spacing={4}>
          <Image
            src={product?.image}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={"lg"}
          ></Image>
          <Stack spacing={4}>
            <Heading>{product?.name}</Heading>
            <Text>${product?.price}</Text>
            <Box>
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
            </Box>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

SelectedProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SelectedProduct;
