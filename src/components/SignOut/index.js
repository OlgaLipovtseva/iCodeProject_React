import React from 'react';
 
import { withFirebase } from '../Firebase';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown} from "react-bootstrap";

const SignOutLink = ({ firebase }) => (
  <NavDropdown.Item onClick={firebase.doSignOut}>Sign out</NavDropdown.Item>
);
 
export default withFirebase(SignOutLink);