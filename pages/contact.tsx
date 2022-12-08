import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineMail,
  AiOutlineLinkedin,
  AiOutlineSend,
} from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { IoSchoolOutline } from "react-icons/io5";
import axios from "axios";
import Layout from "../components/Layout";
import { PageWithLayout } from "../modules/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};
const Contact: PageWithLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const toast = useToast();
  const onSubmit = handleSubmit((data) => {
    axios
      .post("/api/contact", {
        data,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast({
            title: "Message Sent!",
            description: "Your message has been sent!",
            status: "success",
            duration: 10000,
            isClosable: true,
          });
          reset();
        }
      });
  });
  return (
    <div>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Nyran Moodie - Contact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box px={8} py={24} mx="auto">
        <SimpleGrid
          alignItems="center"
          w={{ base: "full", xl: 11 / 12 }}
          columns={{ base: 1, lg: 11 }}
          gap={{ base: 0, lg: 24 }}
          mx="auto"
        >
          <GridItem
            colSpan={{ base: "auto", lg: 7 }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              mb={4}
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              lineHeight={{ base: "shorter", md: "none" }}
              color={useColorModeValue("gray.900", "gray.200")}
              letterSpacing={{ base: "normal", md: "tight" }}
            >
              Want to get in touch?
            </Heading>
            <Text py={6}>
              Reach out to me using any one of the platforms below!
            </Text>
            <VStack mb={5} spacing={4} align="start">
              <Link passHref href={"mailto:info@qualityworkscg.com"}>
                <a target="_blank">
                  <HStack>
                    <IconButton
                      aria-label="Call Segun"
                      size="lg"
                      variant="outline"
                      rounded="full"
                      icon={<AiOutlineMail />}
                    />
                    <Text>info@qualityworkscg.com</Text>
                  </HStack>
                </a>
              </Link>
              <Divider />

              <Link
                passHref
                href={
                  "https://www.linkedin.com/company/qualityworks-consulting-group-llc"
                }
              >
                <a target="_blank">
                  <HStack>
                    <IconButton
                      aria-label="Call Segun"
                      size="lg"
                      variant="outline"
                      rounded="full"
                      icon={<AiOutlineLinkedin />}
                    />
                    <Text>Linkedin</Text>
                  </HStack>
                </a>
              </Link>
              <Divider />

              <Link passHref href={"https://twitter.com/qualityworkscg"}>
                <a target="_blank">
                  <HStack>
                    <IconButton
                      aria-label="Call Segun"
                      size="lg"
                      variant="outline"
                      rounded="full"
                      icon={<FiTwitter />}
                    />
                    <Text>Twitter</Text>
                  </HStack>
                </a>
              </Link>
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: "auto", md: 4 }}>
            <Box as="form" mb={6} rounded="lg" shadow="2xl">
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <FormControl isInvalid={errors.firstName != null}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    {...register("firstName", {
                      required: {
                        value: true,
                        message: "Field is required!",
                      },
                    })}
                    id="firstName"
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.firstName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.lastName != null}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "Field is required!",
                      },
                    })}
                    id="lastName"
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.lastName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email != null}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Field is required!",
                      },
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Email is invalid",
                      },
                    })}
                    id="email"
                    type="text"
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.subject != null}>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    {...register("subject", {
                      required: {
                        value: true,
                        message: "Field is required!",
                      },
                    })}
                    id="subject"
                    type="text"
                  />
                  <FormErrorMessage>{errors.subject?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.message != null}>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    {...register("message", {
                      required: {
                        value: true,
                        message: "Field is required!",
                      },
                    })}
                    id="message"
                  />
                  <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
              <Flex px={6} py={4}>
                <Button
                  onClick={() => {
                    onSubmit();
                  }}
                  variant="solid"
                  border="1px"
                  bg="white"
                  py={2}
                  w="full"
                  leftIcon={<AiOutlineSend />}
                >
                  Send Message
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </div>
  );
};

Contact.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Contact;

export const getServerSideProps = withPageAuthRequired();
