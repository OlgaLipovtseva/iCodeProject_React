import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Image } from "react-bootstrap";

const NotFound = () => (
  <Container className="text-center">
<Image src="/Images/cat-sorry.gif" width="60"/>
    <h4>Page Not Found!</h4>
  </Container>
);

export default NotFound;