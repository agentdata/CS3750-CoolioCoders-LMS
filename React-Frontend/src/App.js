import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";

function App(props) {
  return (
    // returns protected route if user authenticated, otherwise login page
    <div className="App">
      <Switch>
      <Route path="/login" component={Login} />
        <ProtectedRoute
          path="/"
          component={Home}
          isAuthenticated={props.isAuthenticated}
          isLoggingIn={props.isLoggingIn}
        />
      </Switch>
    </div>
    // for testing Home Page without needing to sign in, comment above and uncomment <Home />
    // <Home />
  )
}
// maps state to App props
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoggingIn: state.auth.isLoggingIn
  };
}
export default connect(mapStateToProps)(App);
