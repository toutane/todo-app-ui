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
import { LogProvider, LogContext } from './techComponents/LoginProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "./themes/superhero-4.1.0.min.css",
    };
    this.onChangeTheme = this.onChangeTheme.bind(this);
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
          <LogProvider>
            <div>
              <LogContext>
                <NavBar />
              </LogContext>

              <LogContext>
                <Switch>
                  <Route exact path="/home" render={(props) => <LogContext><Home {...props} /></LogContext>} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" render={(props) => <LogContext><Login {...props} /></LogContext>} />
                  <Route path="/inbox" component={Inbox} />
                  <Route path="/today" component={Today} />
                  <Route path="/activities" render={(props) => <LogContext><Activities {...props} /></LogContext>} />
                  <Route path="/settings" render={(props) => <Settings onChangeTheme={this.onChangeTheme} {...props} />} />
                  <Route component={Home} />
                </Switch>
              </LogContext>

            </div>
          </LogProvider>
        </Router>

      </div>
    );
  }
}

export default App;
