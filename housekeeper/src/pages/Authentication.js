import React, { Component } from "react";
import authService from "./../lib/auth-service";

class Authentication extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    showSignup: false,
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleSignup = () => {
    this.setState({
      showSignup: !this.state.showSignup,
      email: "",
      password: "",
      username: "",
    });
  };

  submitLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    authService
      .login(email, password)
      .then((response) =>
        console.log("response, response.data", response, response.data)
      );
  };

  submitSignup = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    authService
      .signup(username, email, password)
      .then((response) =>
        console.log("response, response.data", response, response.data)
      );
  };

  render() {
    return !this.state.showSignup ? (
      <div>
        <h2>Login form</h2>
        <form onSubmit={(e) => this.submitLogin(e)}>
          <label>Email: </label> <br />
          <input
            type="text"
            required
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleInput(e)}
          />{" "}
          <br />
          <label>Password: </label> <br />
          <input
            type="password"
            required
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleInput(e)}
          />{" "}
          <br />
          <button type="submit">Submit</button>
        </form>
        Don't have an account? <br />
        <button onClick={this.toggleSignup}>Sign Up</button>
      </div>
    ) : (
      <div>
        <h2>Signup form</h2>
        <form onSubmit={(e) => this.submitSignup(e)}>
          <label>Username: </label> <br />
          <input
            type="text"
            required
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleInput(e)}
          />
          <br />
          <label>Email: </label> <br />
          <input
            type="text"
            required
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleInput(e)}
          />
          <br />
          <label>Password: </label> <br />
          <input
            type="password"
            required
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleInput(e)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        Already have an account? <br />
        <button onClick={this.toggleSignup}>Log In</button>
      </div>
    );
  }
}

export default Authentication;
