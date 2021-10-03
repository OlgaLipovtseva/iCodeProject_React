import React from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Carousel,
} from "react-bootstrap";

const Landing = () => (
  <Container>
    {/* /-- Stack the columns on mobile by making full-width --> */}
    <Row>
      <Col lg="8">
        {/* <!-- Carousel --> */}
        <Carousel id="myCarousel" data-ride="carousel">
          {/* <!-- Wrapper for slides --> */}
          <Carousel.Item>
            <Image src="Images/tour.jpg" className="d-block w-100" alt="Tour" />
            <Carousel.Caption className="d-none d-md-block text-dark">
              <h5>2022 Tour</h5>
              <p>Vancouver - Calgary - Toronto</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="Images/Album.jpg"
              className="d-block w-100"
              alt="New Album"
            />
            <Carousel.Caption className="d-none d-md-block text-dark">
              <h5>New Album</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>

      <Col lg="4">
        <Jumbotron>
          <h5 className="display-5 text-center">
            Changes in the concert schedule
          </h5>
          <p>
            Please be aware that concert dates in some cities have changed,
            egestas eget quam. Vestibulum id ligula porta felis euismod semper.
          </p>
        </Jumbotron>

        <div className="text">
          <h5>New album</h5>
          <p>
            Vestibulum id ligula porta felis euismod semper. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus.
          </p>
          <p>
            <Link className="btn btn-secondary" to={ROUTES.MUSIC}>
              Download here »
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Landing;
