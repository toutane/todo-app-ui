import React, { Component } from 'react';
import { getUser, getLogout, postLogin } from '../api/BeAPI'

const LoginContext = React.createContext();

export class LogProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'aucun-en-vrai 👾',
      isLogged: false
    }
    this.loginFunction = this.loginFunction.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
  }
  loginFunction(username, password) {
    console.log('from loginFunction: ', username, password);
    postLogin({ username, password }).then(response => {
      if (response.error) {
         console.log('error in postLogin response: ', response.message)
       } else {
        getUser().then(user =>
          this.setState({
            isLogged: true, user: user[0]
          }, user.error === undefined
              ? (this.setState({isLogged: true}))
              : (this.setState({isLogged: false}))
          )
        );
        //  this.props.history.push("/today");
       }
    })
  }
  logoutFunction() {
    getLogout()
    .then(response => {
      this.setState({ isLogged: false }, console.log('logout from contexte :', response));
      // this.props.history.push("/home");
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
