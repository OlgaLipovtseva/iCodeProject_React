import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { PasswordForgetLink } from "../PasswordForget";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SignInPage = () => (
  <Container fluid>
    <h4>
      <i className="bi bi-person"></i>Log in
    </h4>
    <SignInForm />
  </Container>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
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

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";
   // console.log(isInvalid);
    return (
      <Form className="form-sign text-center" onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.onChange}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size="lg" disabled={isInvalid}>
          Log in <i className="bi bi-box-arrow-in-right"></i>
        </Button>
        <Form.Text className="text">
          <SignUpLink />
          <PasswordForgetLink />
        </Form.Text>
        {error && <Alert variant="warning">{error.message}</Alert>}
      </Form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
