import React from 'react';
import {
  Button, ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { getLogout } from '../api/BeAPI' 

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);  
  }


  logoutFunction() {
    getLogout()
    .then(response => this.props.history.push("/"))
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button tag={Link} to="/"><i className="fas fa-home"></i></Button>
          &nbsp;&nbsp;&nbsp;<Button color="info" onClick={this.logoutFunction}><i className="fas fa-sign-out-alt"></i> Logout</Button>        
        </ButtonGroup>
      </div>
    );
  };
}

export default Logout;