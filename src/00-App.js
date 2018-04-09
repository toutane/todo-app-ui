import React, { Component } from 'react';
import { Switch, Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Login from './techComponents/Login';
import Signup from './techComponents/SignUp';
import Home from './views/00-Home';
import Inbox from './views/01-Inbox'
import Today from './views/02-Today';
import Activities from './views/03-Activities'
import Settings from './views/04-Settings';
import NavBar from './02-NavBar';
import BottomView from './03-BottomView';
import { getLogout } from './api/BeAPI';

import { projects } from './database/projects';
// import { LoginProvider } from './techComponents/LoginProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "./themes/superhero-new.min.css",
      user: "",
      isLogged: false,
    };
    this.onChangeTheme = this.onChangeTheme.bind(this);
    this.loginFunction = this.loginFunction.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);
  }
  loginFunction() {
    this.setState({ isLogged: true });
  }
  logoutFunction() {
    getLogout()
    .then(response => {
      this.setState({ isLogged: false });
      // this.props.history.push("/home");
    })
  }
  onChangeTheme(newTheme) {
    this.setState({
      theme: newTheme
    });
  }
  render() {
    return (
      <div>
        <Helmet
          onChangeClientState={(newState, addedTags, removedTags) => console.log(newState, addedTags, removedTags)}>
          <link rel="stylesheet" type="text/css" href={this.state.theme}></link>
        </Helmet>
        <Router>
          <div>
            <NavBar isLoginState={this.state.isLogged} loginFunction={this.loginFunction} logoutFunction={this.logoutFunction}/>
            &nbsp;
            <Switch>
        {/* <LoginProvider {...this.props}> */}
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route isLoginState={this.state.isLogged} loginFunction={this.loginFunction} logoutFunction={this.logoutFunction} path="/login" component={Login} />
              <Route path="/inbox" component={Inbox} />
              <Route path="/today" component={Today} />
              <Route path="/activities" component={Activities} />
              <Route path="/settings" render={(props) => <Settings onChangeTheme={this.onChangeTheme} {...props}/>} />
              {projects.map( (project, i) =>
                <Route
                path={project.project_url}
                component={Today}
                key={i}/>
              )}
              <Route component={Home}/>
        {/* </LoginProvider> */}
            </Switch>
            {/* <BottomView/> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
