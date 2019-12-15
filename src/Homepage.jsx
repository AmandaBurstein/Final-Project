import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

class Homepage extends Component {
  render = () => {
    return (
      <div className="homepage-container">
        <div className="homepage-header">
          <div className="header-logo">GLAZED</div>
          <div className="header-details">
            GLAZED helps you calculate glaze recipes at any batch volume, save
            your favourite recipes, and easily access and update recipes in your
            personal catalogue
          </div>
          <div>
            <Link className="about-link" to="/About">
              ABOUT
            </Link>
          </div>
        </div>
        <div className="signup-login-container">
          <div className="signup-login-form">
            <div>
              <Signup />
            </div>
            <div>
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Homepage;
