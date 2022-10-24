import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  LinkOverlay,
  Stack,
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
import React from "react";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { useSnipcart } from "use-snipcart";
function TopNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { cart = {} } = useSnipcart();
  return (
    <Box>
      <Box p={3} px={["", 24]} w="100%" shadow="base" bg={"white"}>
        <HStack justifyContent="space-between">
          <Box>
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
                  variant={
                    router.pathname === "/products" ? "solid" : "unstyled"
                  }
                  color={router.pathname === "/products" ? "white" : "teal"}
                  colorScheme={"teal"}
                >
                  Home
                </Button>
              </Link>
              <a
                href={"https://qualityworkscg.com/automation-bootcamp/"}
                target={"_blank"}
              >
                <Button
                  variant={"unstyled"}
                  color={"teal"}
                  colorScheme={"teal"}
                >
                  About
                </Button>
              </a>
              <Link href={"/contact"}>
                <Button
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
                    variant={router.pathname === "/" ? "solid" : "unstyled"}
                    color={router.pathname === "/" ? "white" : "teal"}
                    colorScheme={"teal"}
                    w={"full"}
                  >
                    Products
                  </Button>
                </Link>
                <Divider />
                <Link href={"/contact"}>
                  <Button
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
