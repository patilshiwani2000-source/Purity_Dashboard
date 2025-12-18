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
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const history = useHistory();
  const { user, setUser } = useAuth();
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const state = location?.state || {};
    const registeredEmail = state?.registeredEmail;
    const flash = state?.flash;

    if (flash) setInfo(flash);
    if (registeredEmail) {
      setFormData((prev) => ({ ...prev, email: registeredEmail }));
    }

    // Clear one-time state so refresh doesn't keep showing it
    if (flash || registeredEmail) {
      history.replace({ ...location, state: {} });
    }
  }, [history, location]);

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setInfo("");
    AuthApi.Login(formData).then(response => {
      if(response.data.success) {
        return setProfile(response);
      } else {
        const rawMsg = response.data?.msg || "Login failed";
        const shouldHide =
          /could not translate host name|name or service not known|connection refused|localhost.*5432/i.test(
            rawMsg
          );
        // Hide server/DB connectivity details from UI (show nothing)
        setError(shouldHide ? "" : rawMsg);
      }
    }).catch(error => {
      const status = error.response?.status;
      const rawMsg = error.response?.data?.msg || error.message || "There has been an error.";
      const shouldHide =
        (typeof status === "number" && status >= 500) ||
        /could not translate host name|name or service not known|connection refused|localhost.*5432/i.test(
          rawMsg
        );
      // Hide server/DB connectivity details from UI (show nothing)
      return setError(shouldHide ? "" : rawMsg);
    })
  }

  const setProfile = (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return history.push("/dashboard");
  };
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        {user && user.token ? (
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              You are already signed in.
            </Heading>
          </Flex>
        </Flex>
        ) : (
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              add your credentials
            </Text>
            {info ? (
              <Text color="green.500" mb="12px" fontWeight="bold" fontSize="14px">
                {info}
              </Text>
            ) : null}
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Email
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder='Your email adress'
                size='lg'
                onChange={handleChange}
                name="email"
                value={formData?.email}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Your password'
                size='lg'
                onChange={handleChange}
                name="password"
                value={formData?.password}
              />
              <FormControl display='flex' alignItems='center'>
                <Switch id='remember-login' colorScheme='teal' me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  ms='1'
                  fontWeight='normal'>
                  Remember me
                </FormLabel>
              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
                {error ? (
                  <Text color="red" marginTop="10px" fontWeight='medium'>
                    {error}
                  </Text>
                ) : null}
              </Flex>
              <Button
                onClick={handleSubmit}
                fontSize='10px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}>
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link color={titleColor} href="#/auth/signup" ms='5px' fontWeight='bold'>
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>)}
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;