import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedNavbar extends Component {
  logoutHandler = () => {
    console.log("logout clicked");
    this.props.dispatch({ type: "logout" });
    console.log("this.props.loggedIn", this.props.loggedIn);
    this.props.history.push("/");
  };

  render = () => {
    return (
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link className="navbar-logo" to="/">
            Oklay
          </Link>
        </div>
        <div className="navbar-logout-container">
          <div className="navbar-logout">
            <div onClick={this.logoutHandler}>LOGOUT</div>
          </div>
        </div>
      </div>
    );
  };
}

let Navbar = connect()(UnconnectedNavbar);

export default withRouter(Navbar);
