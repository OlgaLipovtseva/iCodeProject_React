import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SignUpPage = () => (
  <Container fluid>
    <h4>
      <i className="bi bi-person"></i>Sign up
    </h4>
    <SignUpForm />
  </Container>
);
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.doWriteUserData(
          authUser.user.uid,
          username,
          email,
          roles
        );
      })
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, isAdmin, error } =
      this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Form className="form-sign text-center" onSubmit={this.onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.onChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Row className="g-2">
            <Col md>
              <Form.Control
                type="password"
                placeholder="Password"
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
              />
            </Col>
            <Col md>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Admin"
            name="isAdmin"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </Form.Group>

        <Button variant="primary" type="submit" size="lg" disabled={isInvalid}>
          Sign up <i className="bi bi-box-arrow-in-right"></i>
        </Button>
        <Form.Text className="text"></Form.Text>
        {error && <Alert variant="warning">{error.message}</Alert>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
