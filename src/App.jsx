import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Calculator from "./Calculator.jsx";
import Catalogue from "./GlazeCatalogue.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

class UnconnectedApp extends Component {
  render = () => {
    if (this.props.loggedIn.loggedIn === true)
      return (
        <div>
          <h3>Glaze Calculator</h3>
          <Calculator />
          <Catalogue />
        </div>
      );
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/catalogue" component={Calculator} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
