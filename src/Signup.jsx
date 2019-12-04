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
    if (body.success === true) {
      this.setState({ signedUp: true });
      window.alert("Signup successful");
    }
  };

  render = () => {
    if (!this.state.signedUp) {
      return (
        <div>
          <h1>Signup</h1>
          <form onSubmit={this.submitHandler}>
            Username
            <input
              type="text"
              value={this.state.username}
              onChange={this.usernameHandler}
            ></input>
            Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordHandler}
            ></input>
            <input type="submit" value="Sign up"></input>
          </form>
          <form>
            <div>
              <Link to="/login">
                Already have an account? Click here to log in
              </Link>
            </div>
          </form>
        </div>
      );
    }
    return <Redirect to="/login" />;
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
