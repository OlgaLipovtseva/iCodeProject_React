import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Image, Table, Button } from "react-bootstrap";

import React, { Component } from "react";
import { connect } from "react-redux";
import { removeItem, addQuantity, subtractQuantity } from "./cartActions";

import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class Cart extends Component {
  //to remove the item completely
  handleRemove = (item) => {
    this.props.removeItem(item);
  };
  //to add the quantity
  handleAddQuantity = (item) => {
    this.props.addQuantity(item);
  };
  //to substruct from the quantity
  handleSubtractQuantity = (item) => {
    this.props.subtractQuantity(item);
  };
  render() {
    const cartIsEmpty = !this.props.items.length;

    let addedItems = this.props.items.map((item) => {
      let key = item.chosenSize + item.index;
      let allPrice = item.quantity * item.price;

      return (
        <tr key={key}>
          <td>
            <Image src={item.image} width="70" />
          </td>
          <td>{item.name}</td>
          <td>{item.chosenSize}</td>
          <td>{item.quantity}</td>
          <td>${allPrice}</td>
          <td>
            <div className="add-remove">
              <Link to={ROUTES.CART}>
                <i
                  className="bi bi-patch-plus"
                  onClick={() => {
                    this.handleAddQuantity(item);
                  }}
                ></i>
              </Link>
              <Link to={ROUTES.CART}>
                <i
                  className="bi bi-patch-minus"
                  onClick={() => {
                    this.handleSubtractQuantity(item);
                  }}
                ></i>
              </Link>

              <Link to={ROUTES.CART}>
                <i
                  className="bi bi-trash"
                  onClick={() => {
                    this.handleRemove(item);
                  }}
                ></i>
              </Link>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Container>
        <h5>Cart:</h5>
        {cartIsEmpty ? (
          <p>You chose nothing yet.</p>
        ) : (
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{addedItems}</tbody>
            </Table>
            <div className="text-total">
              <strong>Total: ${this.props.total}</strong>
             <div>
              <Button
                variant="primary"
                type="submit"
                size="lg"
              >
                Check out <i className="bi bi-box-arrow-in-right"></i>
              </Button>
              </div>
            </div>
          </Container>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: (id) => {
      dispatch(subtractQuantity(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
