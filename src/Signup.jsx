import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      signedUp: false
    };
  }

  usernameHandler = event => {
    this.setState({ username: event.target.value });
  };

  passwordHandler = event => {
    this.setState({ password: event.target.value });
  };

  submitHandler = async event => {
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    console.log("/signup response", body);
    body = JSON.parse(body);
    if (body.success === false) {
      window.alert("Username already exists, please try again");
    }
  };

  render = () => {
    return (
      <div>
        <h1>signup</h1>
        <form onSubmit={this.submitHandler}>
          <input
            className="signup-login-input"
            type="text"
            value={this.state.username}
            placeholder=" Username"
            onChange={this.usernameHandler}
          ></input>
          <div></div>
          <input
            className="signup-login-input"
            type="password"
            value={this.state.password}
            placeholder=" Password"
            onChange={this.passwordHandler}
          ></input>
          <input className="button" type="submit" value="SUBMIT"></input>
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
