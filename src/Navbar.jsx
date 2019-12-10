import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedNavbar extends Component {
  logoutHandler = () => {
    console.log("logout clicked");
    this.props.dispatch({ type: "logout" });
    console.log("this.props.loggedIn", this.props.loggedIn);
  };

  render = () => {
    return (
      <div>
        <div>
          <Link to="/">Oklay</Link>
        </div>
        <div>
          <button onClick={this.logoutHandler}>
            <Link to="/">Logout</Link>
          </button>
        </div>
      </div>
    );
  };
}

let Navbar = connect()(UnconnectedNavbar);

export default Navbar;
