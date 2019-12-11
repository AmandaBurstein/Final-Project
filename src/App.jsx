import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, BrowserRouter, Route, Link } from "react-router-dom";
import Calculator from "./Calculator.jsx";
import Catalogue from "./GlazeCatalogue.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Homepage from "./Homepage.jsx";
import Navbar from "./Navbar.jsx";
import GlazeCatalogue from "./GlazeCatalogue.jsx";

class UnconnectedApp extends Component {
  render = () => {
    return (
      <div>
        <BrowserRouter>
          <Route
            exact={true}
            path="/calculator"
            render={() => (
              <div>
                <Navbar />
                <div className="app-container">
                  <div>
                    <Calculator />
                  </div>
                  <div>
                    <Catalogue />
                  </div>
                </div>
              </div>
            )}
          />
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/catalogue" component={GlazeCatalogue} />
          <Route exact={true} path="/signup" component={Signup} />
          <Route exact={true} path="/login" component={Login} />
        </BrowserRouter>
      </div>
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
