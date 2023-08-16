import React from 'react';
import { ArrowBackIcon,ArrowForwardIcon } from "@chakra-ui/icons";
import { ChakraProvider } from '@chakra-ui/react';
import {
  Flex,
  Heading,
  Input,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Switch,
  VStack,
  useColorMode,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';


import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";
import { AccountContext } from "../AccountContext";
import { useContext, useState, useEffect } from "react";

const Login = () => {
  //const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    setLoggedIn(Boolean(loggedUser));
  }, []);

  return (
    <ChakraProvider>
            <Formik
        initialValues={{ id: "", password: "" }}
        validationSchema={Yup.object({
            id: Yup.string()
            .required("ID required!")
            .max(5, "ID too long!"),
            password: Yup.string()
            .required("Password required!"),
        })}
        onSubmit={(values, actions) => {
            const vals = { ...values };
            actions.resetForm();
            fetch("http://localhost:4000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vals),
            })
            .catch(err => {
                return;
            })
            .then(res => {
                if (!res || !res.ok || res.status >= 400) {
                return;
                }
                return res.json();
            })
            .then(data => {
                if (!data) return;
                setLoggedIn(true);
                if (data.status) {
                setError(data.status);
                } else if (data.loggedIn) {
                localStorage.setItem("logged", true);
                localStorage.setItem("userToken", data.id);
                console.log("bravo");
                navigate("/home");
                }
            });
        }}
        >
        <VStack
            as={Form}
            w={{ base: "90%", md: "500px" }}
            m="auto"
            justify="center"
            h="100vh"
            spacing="1rem"
        >
            <Heading>Log In</Heading>
            <Text as="p" color="red.500">
            {error}
            </Text>
            <TextField
            name="id"
            placeholder="Enter ID"
            autoComplete="off"
            label="id"
            />

            <TextField
            name="password"
            placeholder="Enter password"
            autoComplete="off"
            label="password"
            type="password"
            />

            <ButtonGroup pt="1rem">
            <Button   colorScheme="teal" type="submit">
                Log In
            </Button>
            </ButtonGroup>
        </VStack>
        </Formik>
    </ChakraProvider>
    
  );
};

export default Login;


