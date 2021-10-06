import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button"; 


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      <Form className="form-sign text-center" onSubmit={this.onSubmit}>

       <Form.Group>
          <Form.Control
            type="password"
            placeholder="New password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
          />
          <Form.Control
            type="password"
            placeholder="Confirm New Password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
          />
       </Form.Group>
       <Button variant="primary" type="submit" size="lg" disabled={isInvalid}>
       Change My Password <i className="bi bi-box-arrow-in-right"></i>
        </Button>
 
        {error && <div><br/><Alert variant="warning">{error.message}</Alert></div>}
      </Form>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);