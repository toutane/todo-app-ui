import React, { Component } from 'react';
import { getUser, getLogout, postLogin } from '../api/BeAPI'
import { withRouter } from 'react-router';

const LoginContext = React.createContext();

class LogProv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {username: 'No Logged'},
      isLogged: false,
      location: {pathname: '/login'},
    }
    this.loginFunction = this.loginFunction.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
  }
  loginFunction(username, password) {
    // console.log('from loginFunction: ', username, password);
    postLogin({ username, password }).then(response => {
      if (response.error) {
        // console.log('error in postLogin response: ', response.message)
       } else {
        getUser().then(user =>
          this.setState({
            user: user[0],
          })
        );
        this.setState({
          isLogged: true,
          location: null,
        }, this.props.history.push("/today"))
      }
    })
  }
  logoutFunction() {
    getLogout()
      .then(response => {
        // console.log('logout from contexte :', response);
        this.setState({
          isLogged: false,
          location: { pathname: '/login' },
          user: { username: 'No Logged' } },
          this.props.history.push("/home"));
      })
  }
  render() {
    return (
      <LoginContext.Provider value={{
        state: this.state,
        login: this.loginFunction,
        logout: this.logoutFunction,
      }}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}

export const LogProvider = withRouter(LogProv);

class LogCont extends Component {
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
              login: context.login,
              location: context.state.location,
            } )
        }
      </LoginContext.Consumer>
    )
  }
}

export const LogContext = withRouter(LogCont);