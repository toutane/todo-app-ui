import React, { Component } from 'react';
import { getLogout, postLogin } from '../api/BeAPI'

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
  loginFunction(logMe, user) {
    console.log('from loginFunction: ',logMe, user);
    this.setState({ isLogged: logMe, user: user }
      // this.props.history.push("/home")
    );

    // postLogin({
    //   username: this.state.usernameInput,
    //   password: this.state.passwordInput
    //  }).then(response =>
    //    { response.error
    //      ? console.log(response.message)
    //      : this.setState({ isLogged: true, user: response[0].username })
    //    }
    //  )
  }
  logoutFunction() {
    getLogout()
    .then(response => {
      this.setState({ isLogged: false });
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
        { (context) => {
              if (this.props.testIsLogged) {
                console.log(this.props.testIsLogged);
                  return React.cloneElement(this.props.children, {
                    isLogged: context.state.isLogged,
                    user: context.state.user
                  })
              } else if (this.props.logMe && !this.state.alreadyLoggedOnce) {
                console.log(this.props.logMe, this.props.user);
                this.setState(
                  { alreadyLoggedOnce: true },
                  context.login(this.props.logMe, this.props.user)
                );
              }
          }
        }
      </LoginContext.Consumer>
    )
  }
}

export class LogOff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyLogOffOnce: false,
    }
  }
  render() {
    return (
      <LoginContext.Consumer>
        { (context) => {
          if (!this.props.logOff && !this.state.alreadyLoggedOnce) {
            this.setState(
              { alreadyLogOffOnce: true },
                context.logout()
            );
          }
          }
        }
      </LoginContext.Consumer>
    )
  }
}