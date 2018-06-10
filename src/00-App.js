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
import LittleSwitchRouter from './techComponents/LittleSwitchRouter';
import BottomView from './03-BottomView';
import { getLogout } from './api/BeAPI';
import { projects } from './database/projects';
import { LogProvider, LogContext } from './techComponents/LoginProvider';

// function HOCLogContext(component) {
//   return <LogContext>component</LogContext>
// }

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
          //onChangeClientState={(newState, addedTags, removedTags) => console.log(newState, addedTags, removedTags)}
          >
          <link rel="stylesheet" type="text/css" href={this.state.theme}></link>
        </Helmet>
        <Router>
          <LogProvider>

              <LogContext>
                <NavBar />
              </LogContext>

              <LogContext>
                <LittleSwitchRouter>
                  <Switch>
                    <Route path="/home" render={(props) => <LogContext><Home {...props} /></LogContext>} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" render={(props) => <LogContext><Login {...props} /></LogContext>} />
                    <Route render={(props) => <LogContext><Home {...props} /></LogContext>} />
                  </Switch>
                  <Switch>
                    <Route path="/inbox" component={Inbox} />
                    <Route path="/today" component={Today} />
                    <Route path="/activities" render={(props) => <LogContext><Activities {...props} /></LogContext>} />
                    <Route path="/settings" render={(props) => <Settings onChangeTheme={this.onChangeTheme} {...props} />} />
                    <Route render={(props) => <LogContext><Home {...props} /></LogContext>} />
                  </Switch>
                </LittleSwitchRouter>
              </LogContext>

          </LogProvider>
        </Router>
      </div>
    );
  }
}

export default App;
