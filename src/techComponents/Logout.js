import React from 'react';
import {
  Button, ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LogContext } from '../techComponents/LoginProvider';

import { getLogout } from '../api/BeAPI'

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);
  }
  logoutFunction() {
    this.props.logoff();
    // this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button tag={Link} to="/"><i className="fas fa-home"></i></Button>

          &nbsp;&nbsp;&nbsp;

          <Button color="info" onClick={this.logoutFunction}><i className="fas fa-sign-out-alt"></i> Logout</Button>
        </ButtonGroup>
      </div>
    );
  };
}

export default Logout;