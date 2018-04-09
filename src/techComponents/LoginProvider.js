import React, { Component } from 'react';
import { getLogout } from '../api/BeAPI'

const LoginContext = React.createContext();

export class LoginProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isLogged: false
    }
    this.loginFunction = this.loginFunction.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
  };
  loginFunction() {
    this.setState({ isLogged: true });
  }
  logoutFunction() {
    getLogout()
    .then(response => {
      this.setState({ isLogged: false });
      this.props.history.push("/home");
    })
  }
  render() {
    return (
      <LoginContext.Provider value={{
        state: this.state,
        login: () => this.loginFunction,
        logout: () => this.logoutFunction
      }}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export class LoginLogout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LoginContext.Consumer>
        {(context) => (this.props.log) ? context.login() : context.logout() }
      </LoginContext.Consumer>
    )
  }
}