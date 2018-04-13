import React, { Component } from 'react';
import { getUser, getLogout, postLogin } from '../api/BeAPI'
import { withRouter } from 'react-router';

const LoginContext = React.createContext();

class LogProv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {username: 'No Logged'},
      isLogged: false
    }
    this.loginFunction = this.loginFunction.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
  }
  loginFunction(username, password) {
    console.log('from loginFunction: ', username, password);
    postLogin({ username, password }).then(response => {
      if (response.error) {
        // console.log('error in postLogin response: ', response.message)
       } else {
        getUser().then(user =>
          this.setState({
            isLogged: true, user: user[0]
          }, this.props.history.push("/home"))
        );
       }
    })
  }
  logoutFunction() {
    getLogout()
    .then(response => {
      // console.log('logout from contexte :', response);
      this.setState({ isLogged: false, user: {username: 'No Logged'} }, this.props.history.push("/home"));
    })
  }
  render() {
    return (
      <LoginContext.Provider value={{
        state: this.state,
        login: this.loginFunction,
        logout: this.logoutFunction
      }}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export const LogProvider = withRouter(LogProv);

export class LogContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyLoggedOnce: false,
    }
  }
  render() {
    return (
      <LoginContext.Consumer>
        { (context) => React.cloneElement(this.props.children, {
              isLogged: context.state.isLogged,
              user: context.state.user,
              logoff: context.logout,
              login: context.login
            })
        }
      </LoginContext.Consumer>
    )
  }
}
