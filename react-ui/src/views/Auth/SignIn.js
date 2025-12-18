import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory, useLocation } from "react-router-dom";

function SignIn() {
  const location = useLocation();
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const { user, setUser } = useAuth();

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Flash message after register
  useEffect(() => {
    const state = location?.state || {};
    if (state.flash) setInfo(state.flash);
    if (state.registeredEmail) {
      setFormData((prev) => ({ ...prev, email: state.registeredEmail }));
    }

    if (state.flash || state.registeredEmail) {
      history.replace({ ...location, state: {} });
    }
  }, [history, location]);

  // ✅ FINAL LOGIN HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    AuthApi.Login(formData)
      .then((response) => {
        if (response.data?.success) {
          setProfile(response);
        } else {
          setError(response.data?.msg || "Login failed");
        }
      })
      .catch((error) => {
        const status = error.response?.status;
        const msg = error.response?.data?.msg;

        if (status === 404) {
          setError("User not registered. Please sign up first.");
        } else if (status === 401) {
          setError("Invalid password.");
        } else {
          setError(msg || "Login failed. Try again.");
        }
      });
  };

  const setProfile = (response) => {
    let userData = { ...response.data.user };
    userData.token = response.data.token;

    setUser(JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(userData));

    history.push("/dashboard");
  };

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ sm: "100px", md: "0px" }}
      >
        {user && user.token ? (
          <Flex w="100%" justify="center" align="center">
            <Heading color={titleColor}>You are already signed in.</Heading>
          </Flex>
        ) : (
          <Flex w={{ base: "100%", md: "50%" }} align="center">
            <Flex direction="column" w="100%" p="48px">
              <Heading color={titleColor} mb="10px">
                Welcome Back
              </Heading>
              <Text color={textColor} fontWeight="bold" mb="24px">
                add your credentials
              </Text>

              {info && (
                <Text color="green.500" mb="12px" fontWeight="bold">
                  {info}
                </Text>
              )}

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  mb="24px"
                />

                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  mb="24px"
                />

                <FormControl display="flex" alignItems="center">
                  <Switch colorScheme="teal" mr="10px" />
                  <FormLabel mb="0">Remember me</FormLabel>
                </FormControl>

                {error && (
                  <Text color="red.500" mt="10px" fontWeight="medium">
                    {error}
                  </Text>
                )}

                <Button
                  onClick={handleSubmit}
                  bg="teal.300"
                  color="white"
                  w="100%"
                  mt="20px"
                  _hover={{ bg: "teal.200" }}
                >
                  SIGN IN
                </Button>
              </FormControl>

              <Text mt="20px" color={textColor}>
                Don't have an account?
                <Link href="#/auth/signup" color={titleColor} ml="5px">
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        )}

        <Box
          display={{ base: "none", md: "block" }}
          w="40vw"
          position="absolute"
          right="0"
          h="100%"
          bgImage={signInImage}
          bgSize="cover"
          borderBottomLeftRadius="20px"
        />
      </Flex>
    </Flex>
  );
}

export default SignIn;
