import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../Cart/cartActions";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  CardColumns,
  Card,
  Form,
  Button,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";

import { withFirebase } from "../Firebase";
import { onValue } from "firebase/database";

class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      productsWithoutFilter: [],
      products: [],
      addedToCart: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.notShowAlert = this.notShowAlert.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    const productType = event.target.value;
    const { productsWithoutFilter } = this.state;
    if (productType) {
      const filteredProducts = productsWithoutFilter.filter(
        (product) => product.type === productType
      );
      this.setState({ products: filteredProducts });
    }
    else {
      this.setState({ products: productsWithoutFilter });
    }
  }

  handleClick(product, size) {
    // size is added in function productWithSize
    this.setState({ addedToCart: true });
    this.props.addToCart(productWithSize(product, size));
    // console.log(size);
  }

  //alert that product was added to cart
  notShowAlert() {
    this.setState({ addedToCart: false });
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
        productsWithoutFilter: productsList,
        loading: false,
      });
    });
  }

  render() {
    const { products, loading, addedToCart } = this.state;

    //
    return (
      <Container>
        {/* Filter */}
        <Container className="filter-wrap">
          <Form.Label>Filter:</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            id="filter-select"
            custom
            onChange={this.handleFilter}
          >
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Album">Album</option>
          </Form.Control>
        </Container>
        <hr className="line" />

        {loading && (
          <div>
            <Spinner animation="border" variant="primary" /> Loading ...
          </div>
        )}

        <Alert
          variant="success"
          show={addedToCart}
          onClose={() => this.notShowAlert()}
          dismissible
        >
          <p>Product added to cart!</p>
        </Alert>

        <CardColumns>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.index}
              handleClick={this.handleClick}
            />
          ))}
        </CardColumns>
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

    //if a product is Clothing type and there is no sizes availible or for other products if quantity in noSize=0
    const outOfStock = (isClothing && noSizes) || product.noSize === 0;

    return (
      <Card className="card-product text-center">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>

          {/*for out of stock products - warning;
          if product is "clothing" and sizes availible: sizes loaded to select input 
          + button Add to Cart is also there */}
          {outOfStock ? (
            <p className="textWarning"> Out of stock</p>
          ) : (
            <div>
              {isClothing ? (
                <Form>
                  <SizesList product={product} handleClick={handleClick} />
                </Form>
              ) : (
                <ButtonToCart product={product} handleClick={handleClick} />
              )}
            </div>
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
