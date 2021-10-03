import React, { Component } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { onValue } from "firebase/database";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Tabs, Tab, Table, Image, Spinner } from "react-bootstrap";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      products: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    //getting users and products from firebase
    let Refdb = this.props.firebase.doGetDb("users"); //.then((result) => console.log(result));
    onValue(Refdb, (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
      });
    });
    let RefdbProducts = this.props.firebase.doGetDb("products");
    onValue(RefdbProducts, (snapshot) => {
      const productsObject = snapshot.val();
      const productsList = Object.keys(productsObject).map((key) => {
        // sizes is an object and is a child of a product, looks like sizeName:quantity, "L:2"
        // converting the size oject into a list
        let listSizes = [];
        if (productsObject[key].size) {
          listSizes = Object.keys(productsObject[key].size).map((keySize) => {
            let sizesObject = productsObject[key].size;
            return {
              quantity: sizesObject[keySize],
              size: keySize,
            };
          });
        }

        //   console.log(listSizes);
        return {
          ...productsObject[key],
          listSizes: listSizes,
          uid: key,
        };
      });

      this.setState({
        products: productsList,
        loading: false,
      });
    });
  }
  //componentWillUnmount() {
  //.off();
  //}

  render() {
    const { products, users, loading } = this.state;

    return (
      <Container>
        <h4>Administration page</h4>

        {loading && (
          <div>
            <Spinner animation="border" variant="primary" /> Loading ...
          </div>
        )}

        <Tabs defaultActiveKey="products" id="uncontrolled-tab">
          <Tab eventKey="products" title="Products">
            <ProductList products={products} />
          </Tab>

          <Tab eventKey="users" title="Users">
            <UserList users={users} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const ProductRow = ({ product }) => {
  const isClothing = product.type === "Clothing";
  
  //if a product is Clothing type and there is no sizes availible or for other products if quantity in noSize=0
  const outOfStock =
    (isClothing && !product.listSizes.length) || product.noSize === 0;
  return (
    <tr>
      <td>{product.uid}</td>
      <td>
        {" "}
        <Image src={product.image} width="70" />
      </td>
      <td>{product.type}</td>
      <td>{product.name}</td>

      <td>
        {outOfStock ? (
          <p className="textWarning"> Out of stock</p>
        ) : (
          <div>
            {isClothing ? (
              <ul>
                {product.listSizes.map((item) => (
                  <li key={item.size}>
                    {item.size} - {item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{product.noSize}</p>
            )}
          </div>
        )}
      </td>
      <td>${product.price}</td>
    </tr>
  );
};

const ProductList = ({ products }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th></th>
        <th>Type</th>
        <th>Name</th>
        <th>Sizes/Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <ProductRow product={product} key={product.uid} />
      ))}
    </tbody>
  </Table>
);

const UserList = ({ users }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.uid}>
          <td>{user.uid}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
