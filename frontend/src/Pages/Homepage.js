import React from "react";
import "./Homepage.css";

// import { useState } from "react";
import {
  
  MDBContainer,
  MDBRow,
  MDBCol,
 
} from "mdb-react-ui-kit";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";

const HomePage = () => {
  return (
    <MDBContainer className="mt-5  shadow-5-strong ">
      <MDBRow>
        <MDBCol md="4" className="login">
          <Box w="100%">
            <Tabs variant="enclosed" color="black">
              <TabList>
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </MDBCol>

        <MDBCol md="8" className="secondcolumn">
          <div className=" d-flex flex-row text-dark  p-md-4  titlediv">
            <p class="small mt-0 text-dark">
              <h4 class="mb-2 fs-5 fw-bold">Connecting The World Together</h4>
              Experience a totally new way to share today! <br></br>
              We promise you the most secure, end to end encrypted communication
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default HomePage;