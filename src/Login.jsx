import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("login from submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", { method: "POST", body: data });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Login failed, please try again");
      return;
    }
    this.props.dispatch({
      type: "login-success"
    });
    console.log("this.props.loggedIn", this.props.loggedIn);
    this.props.history.push("/calculator");
  };

  render = () => {
    return (
      <div>
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="signup-login-input"
            type="text"
            placeholder=" Username"
            onChange={this.handleUsername}
          />
          <div></div>
          <input
            className="signup-login-input"
            type="password"
            placeholder=" Password"
            onChange={this.handlePassword}
          />
          <input className="signup-login-button" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let Login = connect(mapStateToProps)(UnconnectedLogin);

export default withRouter(Login);
