import { Box, Flex, Image, Link as Anchor } from "@chakra-ui/core";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";
import logo from "../assets/logo.svg";

interface MenuItemProps {
  children: ReactNode;
  path: string;
}

const MenuItem = ({ children, path }: MenuItemProps) => (
  <Link to={path}>
    <Anchor mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Anchor>
  </Link>
);

function Header() {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Image width="8rem" src={logo} />
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <Hamburger />
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItem path="/designer">Designer</MenuItem>
      </Box>
    </Flex>
  );
}

export default Header;
