import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
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
    let response = await fetch("/login", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Login failed, please try again");
      return;
    }
    alert("Login successful");
    this.props.dispatch({
      type: "login-success",
      username: this.state.username
    });
  };

  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <h1>Login </h1>
          <form onSubmit={this.handleSubmit}>
            <div>Username</div>
            <input type="text" onChange={this.handleUsername} />
            <div></div>
            <div>Password</div>
            <input type="password" onChange={this.handlePassword} />
            <input type="submit" value="Login" />
          </form>
          <form>
            <div>
              <Link to="/signup">
                Not a member? Click here to create an account
              </Link>
            </div>
          </form>
        </div>
      );
    }
    return <Redirect to="/catalogue" />;
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;
