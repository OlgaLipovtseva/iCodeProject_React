import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Form, Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const PasswordForgetPage = () => (
  <Container fluid>
    <h4>
      <i className="bi bi-person"></i>Password change
    </h4>
    <PasswordForgetForm />
  </Container>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
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
      </Form.Group>
      <Button variant="primary" type="submit" size="lg" disabled={isInvalid}>
        Sent email to change <i className="bi bi-envelope"></i>
      </Button>
      <Form.Text className="text">

      </Form.Text>
      {error && <Alert variant="warning">{error.message}</Alert>}
    </Form>
    );
  }
}
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };