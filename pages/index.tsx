import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { products } from "../data/products";
const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  if (!isLoading && user) {
    router.push("products");
  }
  return (
    <>
      <Head>
        <title>Automation Camp Store | Login</title>
        <meta name="description" content="Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && !user && (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading id={"login-text"} textAlign={"center"}>
                Welcome to the Automation Camp Store
              </Heading>

              <Stack spacing={6}>
                <Center>
                  <Link href="/api/auth/login">
                    <Button
                      id={"signInOrRegister"}
                      colorScheme={"teal"}
                      variant={"solid"}
                    >
                      Sign In Or Register
                    </Button>
                  </Link>
                </Center>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src={
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
              }
            />
          </Flex>
        </Stack>
      )}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      products,
    },
  };
};
