import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../Cart/cartActions";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardDeck, Card, Form, Button, Col } from "react-bootstrap";

import { withFirebase } from "../Firebase";
import { onValue } from "firebase/database";


class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(product, size) {

   // size is added in productWithSize
    this.props.addToCart(productWithSize(product, size));
    //
    // console.log(size);
  }

  //getting products from firebase to state
  componentDidMount() {
    this.setState({ loading: true });

    let Refdb = this.props.firebase.doGetDb("products");
    onValue(Refdb, (snapshot) => {
      const productsObject = snapshot.val();
      const productsList = Object.keys(productsObject).map((key) => ({
        ...productsObject[key],
        index: key,
      }));
      /*  console.log(productsList); */
      this.setState({
        products: productsList,
        loading: false,
      });
    });
  }

  render() {
    const { products, loading } = this.state;

    //
    return (
      <Container>
        {loading && <div>Loading ...</div>}
        <CardDeck>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.index}
              handleClick={this.handleClick}
            />
          ))}
        </CardDeck>
      </Container>
    );
  }
}

const productWithSize = (product, size) => {
  return {
    ...product,
    chosenSize: size,
  };
};

export class ProductCard extends Component {
  render() {
    const { product, handleClick } = this.props;
    const isClothing = product.type === "Clothing";
    const noSizes = !product.size;
    return (
      <Card className="card-product text-center">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>

          {/*if product is "clothing" and sizes availible: sizes loaded to select input 
          + button Add to Cart is also there */}

          {isClothing ? (
            <Form>
              {noSizes ? (
                <Form.Text className="textWarning"> Out of stock </Form.Text>
              ) : (
                <SizesList product={product} handleClick={handleClick} />
              )}
            </Form>
          ) : (
            <ButtonToCart product={product} handleClick={handleClick} />
          )}
        </Card.Body>
      </Card>
    );
  }
}

//list of sizes, in state - all list and selected size
class SizesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
      currentSize: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ currentSize: event.target.value });
  }

  componentDidMount() {
    const { product } = this.props;
    const sizesObject = product.size;

    //transfering object sizes into list
    const listItems = Object.keys(sizesObject).map((key) => ({
      ...sizesObject[key],
      uid: key,
    }));
    this.setState({
      sizes: listItems,
      currentSize: listItems[0].uid,
    });
  }

  render() {
    const { product, handleClick } = this.props;
    const { sizes, currentSize } = this.state;
    const listItems = sizes.map((size) => {
      return <option key={size.uid}> {size.uid}</option>;
    });

    return (
      <Form.Group className="text-left">
        <Form.Label>Select size:</Form.Label>
        <Form.Row>
          <Col>
            <Form.Control as="select" custom onChange={this.handleChange}>
              {listItems}
            </Form.Control>
          </Col>
          <Col>
            <ButtonToCart
              product={product}
              handleClick={handleClick}
              size={currentSize}
            />
          </Col>
        </Form.Row>
      </Form.Group>
    );
  }
}

//Button - add product to cart - if product is clothing, button is near the size element
const ButtonToCart = ({ product, handleClick, size }) => {
  return (
    <Button
      variant="outline-primary"
      className="buttonToCart"
      onClick={() => {
        handleClick(product, size);
      }}
    >
      to Cart
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(null, mapDispatchToProps)(withFirebase(StorePage));
