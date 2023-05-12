import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import heartlogo from "../../assets/icon.jpg";
import {
  // MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  // MDBInputGroup,
  MDBFile,
} from "mdb-react-ui-kit";
import axios from "axios";
import {useHistory} from 'react-router-dom'

const Signup = () => {
  const [show, setshow] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setshow(!show);


  const postDetails = (pics) => {
    setloading(true);

    if (pics === undefined) {
      toast({
        title: "Please select an Image!",
        description: "This image appears on your profile",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Lifeline Messenger");
      data.append("cloud_name", "lifelinemessenger");
      fetch(
        "https://api.cloudinary.com/v1_1/lifelinemessenger/image/upload", {method:'post', body:data,}
      ).then((res) => res.json())
       .then(data => {
         setpic(data.url.toString());
          console.log(data.url.toString());
         setloading(false);
       })
       .catch((err)=> {
        console.log(err);
        setloading(false);
       });
    }else{
       toast({
         title: "Please select an Image!",
         description: "This image appears on your profile",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
        setloading(false);
       return;
    }
  };
  const submitHandler = async() => {
    setloading(true);
    if(!name || !email|| !password || !confirmpassword){
      toast({
        title: "Please fill all the fields",
        description: "All fields are mandatory",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setloading(false);
      return;
    }
    if(password !== confirmpassword){
      toast({
        title: "Passwords do not match",
        description: "All fields are mandatory",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    
      return;
    }

  try {
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    const {data}= await axios.post(
      "/api/user",
      {name, email, password, pic},
       config 
       );
    toast({
      title: "Registration Successful!",
      
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });   

    localStorage.setItem('userInfo', JSON.stringify(data));
    setloading(false);
    history.push('/chats');
  } catch (error) {
    toast({
      title: "Error!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
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

      <FormControl id="first-name" isRequired>
        <MDBInput
          wrapperClass="mb-2 mt-3 shadow-5"
          label="Name"
          id="form1"
          type="text"
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <MDBInput
          wrapperClass="mb-2 mt-2 shadow-5"
          label="Email address"
          id="form2"
          type="email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup>
          <MDBInput
            wrapperClass="mb-2 mt-2 shadow-5"
            label="Password"
            id="form3"
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
      <FormControl id="confirmpassword" isRequired>
        <InputGroup>
          <MDBInput
            wrapperClass="mb-2 mt-2 shadow-5"
            label="Confirm Password"
            id="form4"
            type={show ? "text" : "password"}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <InputRightElement width="1.5rem">
            <Button h="1.0rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" className="mb-3 mt-2">
      <FormLabel>Upload your Picture</FormLabel>
        {/* <MDBFile
          
          wrapperClass="mb-2 mt-2"
          label="Upload your picture"
          id="customFile"
          accept="image/"
          
          onChange={(e) => postDetails(e.target.files[0])}
        /> */}
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <div className="text-center  mb-2 mt-3 ">
        <Button
          color={"white"}
          size="md"
          colorScheme="pink"
          
          bgGradient="linear(to-l, #f45c43, #FF0080)"
          width="100%"
          style={{ marginTop: 0 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>

        {/* <MDBBtn
          className="mb-4 w-100 gradient-custom-2"
          onClick={submitHandler}
          isloading={loading}

          
        >
          Sign Up
        </MDBBtn> */}
      </div>
    </div>
  );
};

export default Signup;