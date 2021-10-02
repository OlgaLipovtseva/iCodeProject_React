import React, {Component} from "react";

import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

import SignOutLink from "../SignOut";
import { AuthUserContext } from "../Session";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

// two lines Navbar (colapsable and sticky on top) with image at the top, using bootstrap react library
//shadow for logo and hiding top image on small screens in CSS
const Navigation = () => (
  <Navbar variant="dark" expand="md" sticky="top">
    <Container>
      <LogoMenu />
      <ToggleMenu />
      <MainMenuWithImage />

      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <UserCartMenuWithUser authUser={authUser} />
          ) : (
            <UserCartMenuNoUser />
          )
        }
      </AuthUserContext.Consumer>
    </Container>
  </Navbar>
);

const LogoMenu = () => (
  <Navbar.Brand href={ROUTES.LANDING}>
    <Image className="logo-image" src="/Images/logo.png" width="70" fluid />
  </Navbar.Brand>
);

const ToggleMenu = () => <Navbar.Toggle aria-controls="my-navbar-nav" />;

// main two rows menu with top image
class MainMenuWithImage extends Component {
  render() {
    return (
      <Nav className="flex-column">
        <ul className="top-image">
          <Image src="/Images/topimage.png" height="20" fluid />
        </ul>
        <Navbar.Collapse id="my-navbar-nav" className="justify-content-center">
          <Nav className="mr-auto" >
            <Nav.Link as={Link} to={ROUTES.LANDING}>HOME</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.HISTORY}>HISTORY</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.MUSIC}>MUSIC</Nav.Link>
            <Nav.Link as={Link} to={ROUTES.STORE}>STORE</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Nav>
    );
  }
}

const UserCartMenuNoUser = () => (
  <Nav className="navbar-right">
    <Nav.Link as={Link} to={ROUTES.SIGN_IN}>SIGN IN</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.LANDING}>
      <i className="bi bi-cart2"></i>
    </Nav.Link>
  </Nav>
);

const UserCartMenuWithUser = ({ authUser }) => (
  <Nav className="navbar-right">
    <NavigationUserDropDown authUser={authUser} />
    <Nav.Link as={Link} to={ROUTES.LANDING}>
      <i className="bi bi-cart2"></i>
    </Nav.Link>
  </Nav>
);

//if user signed in - show dropdown menu with Account, sighn out and Admin options
const NavigationUserDropDown = ({ authUser }) => (
  <NavDropdown title="USER" id="basic-nav-dropdown">
    <NavDropdown.Item href={ROUTES.ACCOUNT}>Account</NavDropdown.Item>
    <SignOutLink />
    {!!authUser.roles[ROLES.ADMIN] && (
      <div>
        <NavDropdown.Divider />
        <NavDropdown.Item href={ROUTES.ADMIN}>Admin</NavDropdown.Item>
      </div>
    )}
  </NavDropdown>
);

export default Navigation;
