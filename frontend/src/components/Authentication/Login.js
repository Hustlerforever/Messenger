import React, { useState } from "react";

import heartlogo from "../../assets/icon.jpg";

import {  MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import {
  Button,
  FormControl,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setshow] = useState(false);

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const handleClick = () => setshow(!show);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    setloading(true);
    if (!email || !password ) {
      toast({
        title: "Please fill all the fields",
        description: "All fields are mandatory",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      setloading(false);
      return;
    }
    
    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {  email, password },
        config
      );
      toast({
        title: "You have successfully logged in!",
        description:"Now you can communicate with you friends!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response?.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };

  return (
    <div className="d-flex flex-column ms-2">
      <div className="text-center">
        <MDBRow>
          <MDBCol>
            <img
              className="text-center ms-1"
              src={heartlogo}
              style={{ width: "150px" }}
              alt="logo"
            />
          </MDBCol>
          <MDBCol>
            <h1 className="mt-3  pb-1 fs-2 fw-bold"> Lifeline Messenger </h1>
          </MDBCol>
        </MDBRow>
      </div>

      <p className="mt-4 mb-3 pb-1 fs-5">Please login to your account</p>
      <FormControl id="email" isRequired>
        <MDBInput
          wrapperClass="mb-3 mt-2 shadow-5"
          label="Email address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup>
          <MDBInput
            wrapperClass="mb-2 mt-2 shadow-5"
            label="Password"
            id="password"
            value={password}
            type={show ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="1.5rem">
            <Button h="1.0rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <div className="text-center pt-1 mb-2 mt-3 pb-1">
        {/* <MDBBtn
          className="mb-4 w-100 gradient-custom-2"
          onClick={submitHandler}
        >
          Log In
        </MDBBtn> */}
        <Button
          colorScheme="pink"
          bgGradient="linear(to-l, #f45c43, #FF0080)"
          ent="linear(to-l, #7928CA, #FF0080)"
          width="100%"
          style={{ marginTop: 0 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
      </div>
      <div className="text-center pt-1 mb-2 mt-3 pb-1">
        {/* <MDBBtn
          className="mb-4 w-100 gradient-custom-2"
          onClick={() => {
            setemail("johnsmith@gmail.com");
            setpassword("123456");
          }}
        >
          Get Guest User Credentials
        </MDBBtn> */}
        <Button
          colorScheme="pink"
          bgGradient="linear(to-l, #f45c43, #FF0080)"
          ent="linear(to-l, #7928CA, #FF0080)"
          width="100%"
          mb="10"
          style={{ marginTop: 0 }}
          onClick={() => {
            setemail("kumarmanoj99@example.com");
            setpassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
                
      </div>
    </div>
  );
};

export default Login;