import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
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
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiMenuAltRight } from "react-icons/bi";

function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          {/* <Logo /> */}
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="#" aria-label="LinkedIn" />
            <IconButton as="a" href="#" aria-label="GitHub" />
            <IconButton as="a" href="#" aria-label="Twitter" />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
          reserved.
        </Text>
      </Stack>
    </Container>
  );
}

export default Footer;
