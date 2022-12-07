import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { useSnipcart } from "use-snipcart";
import { useFavorites } from "../context/FavorateContext";
function TopNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { cart = {} } = useSnipcart();

  const { favorites } = useFavorites();
  return (
    <Box>
      <Box p={3} px={["", 24]} w="100%" shadow="base" bg={"white"}>
        <HStack justifyContent="space-between">
          <Box id="logo">
            <HStack>
              <Image src="/favicon.ico"></Image>
              <a href={"/"}>
                <Heading color={"teal"}>Automation Camp Store</Heading>
              </a>
            </HStack>
          </Box>
          <Box>
            <HStack
              spacing={4}
              display={{ base: "none", md: "contents", lg: "contents" }}
            >
              <Link href={"/products"}>
                <Button
                  id="top-home"
                  variant={
                    router.pathname === "/products" ? "solid" : "unstyled"
                  }
                  color={router.pathname === "/products" ? "white" : "teal"}
                  colorScheme={"teal"}
                >
                  Home
                </Button>
              </Link>
              <Link href={"/favorites"}>
                <Button
                  id="top-favorite"
                  variant={
                    router.pathname === "/favorites" ? "solid" : "unstyled"
                  }
                  color={router.pathname === "/favorites" ? "white" : "teal"}
                  colorScheme={"teal"}
                >
                  <Text>Favorites [{favorites.length}]</Text>
                </Button>
              </Link>
              <a
                href={"https://qualityworkscg.com/automation-bootcamp/"}
                rel="noopener noreferrer"
                target={"_blank"}
              >
                <Button
                  id="top-about"
                  variant={"unstyled"}
                  color={"teal"}
                  colorScheme={"teal"}
                >
                  About
                </Button>
              </a>
              <Link href={"/contact"}>
                <Button
                  id="top-contact"
                  variant={
                    router.pathname.includes("/contact") ? "solid" : "unstyled"
                  }
                  color={router.pathname === "/contact" ? "white" : "teal"}
                  colorScheme={"teal"}
                >
                  Contact
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  className={"snipcart-checkout"}
                  leftIcon={<AiOutlineShoppingCart />}
                  variant={"outline"}
                  color={"teal"}
                  colorScheme={"teal"}
                  id="top-cart"
                >
                  ${cart.subtotal?.toFixed(2)}
                </Button>
              </Link>
              <Link href={"/api/auth/logout"}>
                <Button
                  leftIcon={<AiOutlineLogin />}
                  variant={"unstyled"}
                  color={"teal"}
                  colorScheme={"teal"}
                  id="top-sign-out"
                >
                  Sign Out
                </Button>
              </Link>
            </HStack>
            <Box display={{ base: "contents", md: "none", lg: "none" }}>
              <IconButton
                onClick={onOpen}
                color="white"
                bg="teal"
                aria-label=""
                icon={<BiMenuAltRight fontSize={25} />}
              />
            </Box>
          </Box>
        </HStack>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"teal"} />
            <DrawerHeader color={"teal"}>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={5} align="self-start" justifyContent="start">
                <Link href={"/products"}>
                  <Button
                    id="drawer-"
                    variant={router.pathname === "/" ? "solid" : "unstyled"}
                    color={router.pathname === "/" ? "white" : "teal"}
                    colorScheme={"teal"}
                    w={"full"}
                  >
                    Home
                  </Button>
                </Link>
                <Divider />
                <Box w={"full"}>
                  <Link href={"/favorites"}>
                    <Button
                      w={"full"}
                      id="drawer-favorite"
                      variant={
                        router.pathname === "/favorites" ? "solid" : "unstyled"
                      }
                      color={
                        router.pathname === "/favorites" ? "white" : "teal"
                      }
                      colorScheme={"teal"}
                    >
                      <Text>Favorites [{favorites.length}]</Text>
                    </Button>
                  </Link>
                </Box>

                <Divider />
                <Box w={"100%"}>
                  <a
                    href={"https://qualityworkscg.com/automation-bootcamp/"}
                    rel="noopener noreferrer"
                    target={"_blank"}
                  >
                    <Button
                      id="drawer-about"
                      variant={"unstyled"}
                      w={"100%"}
                      color={"teal"}
                      colorScheme={"teal"}
                    >
                      About
                    </Button>
                  </a>
                </Box>

                <Divider />
                <Link href={"/contact"}>
                  <Button
                    id="drawer-contact"
                    variant={
                      router.pathname.includes("/contact")
                        ? "solid"
                        : "unstyled"
                    }
                    color={router.pathname === "/contact" ? "white" : "teal"}
                    colorScheme={"teal"}
                    w={"full"}
                  >
                    Contact
                  </Button>
                </Link>
                <Divider />
                <Link href={"#"}>
                  <Button
                    className={"snipcart-checkout"}
                    leftIcon={<AiOutlineShoppingCart />}
                    variant={"outline"}
                    color={"teal"}
                    colorScheme={"teal"}
                    w={"full"}
                    id="drawer-cart"
                  >
                    ${cart.subtotal?.toFixed(2)}
                  </Button>
                </Link>
                <Divider />
                <Link href={"/api/auth/logout"}>
                  <Button
                    leftIcon={<AiOutlineLogin />}
                    variant={"unstyled"}
                    color={"teal"}
                    colorScheme={"teal"}
                    w={"full"}
                    id="drawer-sign-out"
                  >
                    Sign Out
                  </Button>
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
}

export default TopNav;
