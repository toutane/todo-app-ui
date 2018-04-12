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
      theme: "./themes/superhero-new.min.css",
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
            &nbsp;
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" render={(props) => <LogContext><Login {...props}/></LogContext>} />
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
            </Switch>
          </div>
        </LogProvider>
        </Router>
        
      </div>
    );
  }
}

export default App;
