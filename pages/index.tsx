import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Router, useRouter } from "next/router";
const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  if (!isLoading && user) {
    router.push("products");
  }
  return (
    <>
      {!isLoading && !user && (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading textAlign={"center"}>
                Welcome to the Automation Camp App
              </Heading>

              <Stack spacing={6}>
                <Center>
                  <Link href="/api/auth/login">
                    <Button colorScheme={"teal"} variant={"solid"}>
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
