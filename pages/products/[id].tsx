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
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Layout from "../../components/Layout";
import { products } from "../../data/products";
import { PageWithLayout } from "../../modules/Layout";
import { Product } from "../../modules/product";
const SelectedProduct: PageWithLayout = ({ product }: any) => {
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
              <Tag variant={"outline"} colorScheme={"teal"}>
                {product?.category}
              </Tag>
            </Box>

            <Box>
              <Button
                id={"add-to-cart"}
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
