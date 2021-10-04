import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";


const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Container fluid>
        <h4><i className="bi bi-person"></i> Welcome {authUser.username}!</h4>
        {/* <PasswordForgetForm /> */}
        <PasswordChangeForm />
      </Container>
    )}
  </AuthUserContext.Consumer>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);