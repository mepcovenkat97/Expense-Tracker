import React, { Component } from "react";
import "./Login.css";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authActions";

import auth from "../../apis/auth";
//import { saveUser, getUser } from "../../apis/storage";

class Login extends Component {
  state = {
    email: "",
    password: "",
    logged: false
  };

  componentDidMount() {
    const logged = localStorage.getItem("ExpenseToken");
    this.setState({ logged });
  }

  onChangeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onLoginHandler = async event => {
    event.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      await auth.authenticate(credentials);
      const { user, token } = auth;
      this.props.loginAction(user, token);
      //saveUser(user,token)
      this.props.history.push("/dashboard/expense");
      auth.isAuth = false;
    } catch (e) {
      alert("Login Failed:", e.message);
    }

 
  };

  forgotPasswordHandler = () => {
    console.log(this.props.history);
    this.props.history.push("/forgotpassword");
  };

  render() {
    let showLogin = null;
    if (!this.state.logged) {
      showLogin = (
        <div className="login-container">
          <form>
            <h1>Sign in</h1>
            <div className="form-content">
              <input
                id="email"
                placeholder="Email ID"
                type="text"
                value={this.state.email}
                onChange={this.onChangeHandler}
              />
              <input
                id="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChangeHandler}
              />
              <br />
              <button onClick={this.onLoginHandler} className="button">
                Log in
              </button>
              <br />
              <div className="signup-message">
                <br />
                <p
                  // onClick={() => this.props.history.push("/forgot-password")}
                  onClick={this.forgotPasswordHandler}
                  className="link"
                >
                  Need an Account ?
                </p>
              </div>
            </div>
          </form>
        </div>
      );
   } else {
      showLogin = <Redirect to="/dashboard/expense"/>
    }
    return <div className="app flex-row align-items-center">{showLogin}</div>;
  }
}


//export default Login;
export default connect(
  null,
  { loginAction }
)(Login)