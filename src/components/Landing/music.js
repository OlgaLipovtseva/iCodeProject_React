import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, CardColumns, Badge, Image } from "react-bootstrap";

//colums of cards from bootstrap with css overlay
const Music = () => (
  <Container fluid>
    <CardColumns>
      <Card bg="primary" text="white" className="text-center p-3">
        <h4>To All Dear Fans!</h4>
       <p> All music is shared for free. Please donate {" "} 
        <a href="https://yoomoney.ru/transfer/a2w" class="alert-link" className="refOnPrimary">
           HERE 
        </a> {" "}
         if you want to support musicians. </p>
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
              <a href="https://disk.yandex.com/d/6bmeof3m1mLTlQ" class="btn btn-secondary">
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
              <a href="https://disk.yandex.com/d/6bmeof3m1mLTlQ" class="btn btn-secondary">Download {">>"}</a>
            </div>
        </div>
        </Card.Body>
      </Card>

      <Card className="text-center">
        <Card.Body>
          <Card.Title>Find us on </Card.Title>
          <Card.Text>
          <a href="https://www.youtube.com/channel/UCXT-YesO5vQNHBZiOj5ZPkA">  
          <Image src="/Images/logos/Amazon.svg" height="60" /></a>
          <a href="https://www.youtube.com/channel/UCXT-YesO5vQNHBZiOj5ZPkA">
          <Image src="/Images/logos/Spotify.svg" height="60" /></a>
          <a href="https://www.youtube.com/channel/UCXT-YesO5vQNHBZiOj5ZPkA">
          <Image src="/Images/logos/YouTube.svg" height="60" /></a>
          </Card.Text>
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
              <a href="https://disk.yandex.com/d/6bmeof3m1mLTlQ" class="btn btn-secondary">Download {">>"}</a>
            </div>
        </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img src="/Images/concert.jpg" />
      </Card>

      <Card className="text-right">
        <blockquote className="blockquote mb-0 card-body">
          <p>Lorem ipsum dolor amelor, </p>
           <p>consectetur ipsum adip. </p>
            <p>Integer posuere do delor.</p>
            <p>Ipsum erat dolor lordit.</p>
          <footer className="blockquote-footer">
            <small className="text-muted">
              Song "Lorem" from <cite title="Source Title">Darkness album</cite>
            </small>
          </footer>
        </blockquote>
      </Card>

      <Card className="card-music">
        <Card.Img variant="top" src="/Images/Album4.jpg" />
        <Card.Body>
          <Card.Title>2000 Waves</Card.Title>
          <div class="overlay">
          <div class="text-album"><h4>Album 'Waves' 2000. </h4>
              <h5>Songs:</h5> 
              <ol >
                <li>Tula. </li>
                <li>Toronto. </li>
                <li>Tipezk.</li>
                <li>Tokio.</li>
              </ol>
              <a href="https://disk.yandex.com/d/6bmeof3m1mLTlQ" class="btn btn-secondary">Download {">>"}</a>
            </div>
        </div>
        </Card.Body>
      </Card>

    </CardColumns>
  </Container>
);

export default Music;
