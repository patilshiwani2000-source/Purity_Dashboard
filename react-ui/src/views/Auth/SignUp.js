// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Assets
import BgSignUp from "assets/img/BgSignUp.png";

// API & Auth
import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();
  const toast = useToast();
  const { user } = useAuth();

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await AuthApi.Register(formData);

      if (response.data?.success) {
        toast({
          title: "Registration successful",
          description: "Please sign in to continue",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        history.push("/auth/signin", {
          registeredEmail: formData.email,
        });
      } else {
        setError(response.data?.msg || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Flex direction="column" alignSelf="center" overflow="hidden">
      {/* Background */}
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        bgImage={BgSignUp}
        bgSize="cover"
        zIndex="-1"
      />

      {/* Header */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text fontSize="md" color="white" mt="10px">
          Create your account
        </Text>
      </Flex>

      {/* Form */}
      <Flex align="center" justify="center" mb="60px">
        {user?.token ? (
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            You are already signed in.
          </Text>
        ) : (
          <Flex
            direction="column"
            w="445px"
            p="40px"
            bg={bgColor}
            borderRadius="15px"
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text fontSize="xl" fontWeight="bold" mb="10px" textAlign="center">
              Register
            </Text>

            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="username"
                placeholder="Your full name"
                onChange={handleChange}
                mb="20px"
              />

              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                onChange={handleChange}
                mb="20px"
              />

              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                onChange={handleChange}
                mb="20px"
              />

              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" mr="10px" />
                <Text fontSize="sm">Remember me</Text>
              </Flex>

              {error && (
                <Text color="red.500" mb="15px" textAlign="center">
                  {error}
                </Text>
              )}

              <Button
                bg="teal.300"
                color="white"
                w="100%"
                h="45px"
                _hover={{ bg: "teal.200" }}
                onClick={handleSubmit}
              >
                SIGN UP
              </Button>
            </FormControl>

            <Text textAlign="center" mt="20px">
              Already have an account?
              <Link href="#/auth/signin" color={titleColor} ml="5px">
                Sign In
              </Link>
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default SignUp;
