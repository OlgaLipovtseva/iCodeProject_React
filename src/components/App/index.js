import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import HistoryPage from "../Landing/history";
import MusicPage from "../Landing/music";
import StorePage from "../Store";
import Cart from "../Cart";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr/>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.HISTORY} component={HistoryPage} />
      <Route path={ROUTES.MUSIC} component={MusicPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.STORE} component={StorePage} />
      <Route path={ROUTES.CART} component={Cart} />
    </div>
  </Router>
);

export default withAuthentication(App);
