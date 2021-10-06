import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Card } from "react-bootstrap";
import Maps from "./maps";

const location = { lat: 51.046886025843, lng: -114.0631723531 };

const Contacts = () => (
  <Container className="form-sign">
    <h4>Our Contacts:</h4>
    <Row>
      <Col>
      <Card className="text-center p-3">
      <Card.Text>Location: Somewhere in Calgary</Card.Text>
      <Card.Text>Phone #: 555-555-5555</Card.Text>
      <Card.Text>
      <a href="https://www.youtube.com/channel/UCXT-YesO5vQNHBZiOj5ZPkA"> 
      <i className="bi bi-facebook"> </i></a>
          <a href="https://www.youtube.com/channel/UCXT-YesO5vQNHBZiOj5ZPkA"> 
          <i className="bi bi-youtube"> </i> </a>
          <a href="https://www.youtube.com/channel/UCXT-YesO5vQNHBZiOj5ZPkA"> 
         <i className="bi bi-instagram"> </i></a>
         <a href="mailto:Olgalipovtseva9@gmail.com"> 
         <i className="bi bi-envelope"> </i></a>
      </Card.Text>
      </Card>
      </Col>
      <Col>
        <Maps location={location} />
      </Col>
    </Row>
  </Container>
);

export default Contacts;
