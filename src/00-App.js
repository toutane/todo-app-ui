import React, { Component } from 'react';
import { Switch, Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Login from './techComponents/Login';
import Signup from './techComponents/SignUp';
import LogOut from './views/00-NotLogMenu';
import Inbox from './views/01-Inbox'
import Today from './views/02-Today';
import Activities from './views/03-Activities'
import Settings from './views/04-Settings';
import NavBar from './20-NavBar';

import { projects } from './database/projects'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: "./themes/superhero-theme.min.css"
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
        <Helmet>
          <link rel="stylesheet" type="text/css" href={this.state.theme}></link>
        </Helmet>
        <Router>
          <div>
            &nbsp;<div>&nbsp;</div>
            {/* <NavBar /> */}
            <Switch>
              <Route exact path="/" component={LogOut} />
              <Route path="/signup" component={Signup} />              
              <Route path="/login" component={Login} />
              <Route path="/inbox" component={Inbox} />
              <Route path="/today" component={Today} />
              <Route path="/activities" component={Activities} />
              <Route path="/settings" render={() => <Settings onChangeTheme={this.onChangeTheme} />} />
              {projects.map( (project, i) =>
                <Route 
                path={project.project_url} 
                component={Today}
                key={i}/>
              )}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
