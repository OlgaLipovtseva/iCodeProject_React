import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, CardColumns, Badge } from "react-bootstrap";

//colums of cards from bootstrap with css overlay
const Music = () => (
  <Container fluid>
    <CardColumns>
      <Card bg="primary" text="white" className="text-center p-3">
        <h4>To All Dear Fans!</h4>
        All music is shared for free. Please donate{" "}
        <a href="#" class="alert-link">
          here
        </a>{" "}
        if you want to support musicians.
      </Card>

      <Card className="card-music">
        <Card.Img variant="top" src="/Images/Album.jpg" />
        <Card.Body>
          <Card.Title>2021 Light <Badge variant="primary">New</Badge></Card.Title>
          <div className="overlay">
            <div class="text-album">
              <h4>Album 'Light' 2021. </h4>
              <h5>Songs:</h5>
              <ol>
                <li>Melbourne. </li>
                <li>Moscow. </li>
                <li>Madrid.</li>
                <li>Mexico city.</li>
                <li>Mogadishu.</li>
                <li>Montreal.</li>
                <li>Minsk.</li>
                <li>Munich.</li>
              </ol>
              <a href="#" class="btn btn-secondary">
                Download {'>>'}
              </a>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="card-music">
        <Card.Img variant="top" src="/Images/Album3.jpg" />
        <Card.Body>
          <Card.Title>2018 Darkness</Card.Title>
          <div class="overlay">
            <div class="text-album"><h4>Album 'Darkness' 2018.</h4>
              <h5>Songs:</h5> 
              <ol >
                <li>Saragossa. </li>
                <li>Stockholm. </li>
                <li>San Diego.</li>
                <li>Shanghai.</li>
                <li>Seoul.</li>
                <li>Seattle.</li>
                <li>San Antonio.</li>
                <li>Scarborough.</li>
              </ol>
              <a href="#" class="btn btn-secondary">Download {">>"}</a>
            </div>
        </div>
        </Card.Body>
      </Card>

      <Card className="p-3">
        <blockquote className="blockquote mb-0 card-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante...
          </p>
          <footer className="blockquote-footer">
            <small className="text-muted">
              'London' song <cite title="Source Title">Album Cloud 2016</cite>
            </small>
          </footer>
        </blockquote>
      </Card>

     
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Find us on Amason, Spotify and Youtube</Card.Title>
          <Card.Text>
          
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="card-music">
        <Card.Img variant="top" src="/Images/Album2.jpg" />
        <Card.Body>
          <Card.Title>2016 Cloud</Card.Title>
          <div class="overlay">
          <div class="text-album"><h4>Album 'Cloud' 2016. </h4>
              <h5>Songs:</h5> 
              <ol >
                <li>Lyon. </li>
                <li>London. </li>
                <li>Lipezk.</li>
                <li>Lviv.</li>
                <li>Lisbon.</li>
              </ol>
              <a href="#" class="btn btn-secondary">Download {">>"}</a>
            </div>
        </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img src="holder.js/100px160" />
      </Card>
      <Card className="text-right">
        <blockquote className="blockquote mb-0 card-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            <small className="text-muted">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </small>
          </footer>
        </blockquote>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
          <Card.Text>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Text>
        </Card.Body>
      </Card>
    </CardColumns>
  </Container>
);

export default Music;
