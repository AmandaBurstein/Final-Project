import React, { Component } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

class Homepage extends Component {
  render = () => {
    return (
      <div className="homepage-container">
        <div className="header-logo">Oklay</div>
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
