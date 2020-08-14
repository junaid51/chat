import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import ComponentNotFound from "../components/ComponentNotFound";
import history from "../routers/history";
import firebase from "../config/firebase";
import { setUser } from "../store/actions/baseActions";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { connect } from "react-redux";
import { ProgressBar } from "../components/bs-components/Loaders";
import { Header, Home } from "../components/home";
import { Register, Login } from "../components/auth";

const AppRouter = (props) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        props.setUser(user.toJSON());
        userHasAuthenticated(true);
      } else {
        userHasAuthenticated(false);
      }
    });
  }, []);

  return (
    <>
      {loading && <ProgressBar />}
      {!loading && (
        <Router history={history}>
          <Header />
          <Switch>
            <AuthenticatedRoute
              path="/"
              component={Home}
              exact={true}
              appProps={{ isAuthenticated }}
            />
            <UnauthenticatedRoute
              path="/login"
              component={Login}
              exact={true}
              appProps={{ isAuthenticated }}
            />
            <UnauthenticatedRoute
              path="/register"
              component={Register}
              exact={true}
              appProps={{ isAuthenticated }}
            />
            <Route component={ComponentNotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setUser: setUser(dispatch),
  };
}

export default connect(null, mapDispatchToProps)(AppRouter);
