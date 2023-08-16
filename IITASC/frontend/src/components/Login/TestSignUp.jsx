import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, VStack,Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import React from 'react';
import TextField from "./TextField";
import { AccountContext } from "../AccountContext";
import { useContext, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';

const SignUp = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const canNavigate = false;
  return (
    <ChakraProvider>
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
                username: Yup.string()
                .required("Username required!")
                .min(6, "Username too short!")
                .max(28, "Username too long!"),
                password: Yup.string()
                .required("Password required!")
                .min(6, "Password too short!")
                .max(28, "Password too long!"),
            })}
            onSubmit={(values, actions) => {
                const vals = { ...values };
                actions.resetForm();
                fetch("http://localhost:4000/auth/signup", {
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
                    setUser({ ...data });
                    if (data.status) {
                    setError(data.status); 
                    } else if (data.loggedIn) {
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
                <Heading>Sign Up</Heading>
                <Text as="p" color="red.500">
                {error}
                </Text>
                <TextField
                name="username"
                placeholder="Enter username"
                autoComplete="off"
                label="Username"
                />

                <TextField
                name="password"
                placeholder="Enter password"
                autoComplete="off"
                label="Password"
                type="password"
                />

                <ButtonGroup pt="1rem">
                <Button colorScheme="teal" type="submit">
                    Create Account
                </Button>
                <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                </ButtonGroup>
            </VStack>
            </Formik>
    </ChakraProvider>
    
  );
};

export default SignUp;
