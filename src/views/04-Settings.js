import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card,
  Badge, Button, CardTitle, CardText, Row, Col, CardImg, CardImgOverlay,
  CardFooter
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { getLogout } from '../api/BeAPI'

import Menu from '../10.3-Menu';
import Customization from '../components/CustomizationPanel';
import Account from '../components/AccountPanel';
import Logout from '../techComponents/Logout';

import users from "../database/users.js"

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  logoutFunction() {
    getLogout().then(x => x)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        &nbsp;
      <Container>
          <Row>
            <Col xs="3">
              <Menu/>
                <hr className="my-3"/>        
              <Logout/>
            </Col>
            <Col>
              <h4><i className="fa fa-cog fa-fw" />&nbsp;Settings -&nbsp;&nbsp;<Badge color="primary">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
              <hr className="my-3" />
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    <div><i className="fa fa-eye" />&nbsp;&nbsp;Overview</div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    <div><i className="far fa-id-card" />&nbsp;&nbsp;Account</div>
                    {/* <Badge pill>{user.follower}</Badge> */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    <div><i className="fa fa-magic" />&nbsp;&nbsp;Customization</div>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  &nbsp;
                <Row>
                  <Col>
                  <Card block outline color="">{users.map((user, index) =>
                    <div>
                      <CardTitle>Signed as <b>{user.full_name}</b></CardTitle>
                      <div><hr className="my-3"/></div>
                      <CardText>
                        <b>{user.full_name}</b> {user.bio}
                      </CardText>
                    </div>
                  )}</Card>
                  </Col>
                  <Col xs="4">
                    {/* <Button color="info" onClick={this.logoutFunction}><i className="fas fa-sign-out-alt"></i> Logout</Button> */}
                    <Card block>
                      {users.map((user, index) =>
                        <CardImg top width="100%" src={user.avatar} alt="Card image cap" />)}
                      &nbsp;
                            <CardFooter>{users.map((user, index) =>
                        <div>
                          <h4><b>{user.full_name}</b></h4>
                          <CardText>
                            <h5>{user.username}</h5>
                            <small><i className="fa fa-map-marker" /> {user.location}</small>
                            <div><small><i className="fa fa-sign-in-alt" /> join the {user.join_date}</small></div>
                          </CardText>
                          {/* &nbsp; <Button outline color="secondary"><i className="fa fa-gear"/></Button> */}
                        </div>
                      )}</CardFooter>
                    </Card>
                  </Col>
                  <hr className="my-3"/>
                  {/* <Button>Logout</Button> */}
                </Row>
                </TabPane>
                <TabPane tabId="2">
                  &nbsp;
                <Account />
                </TabPane>
                <TabPane tabId="3">
                  &nbsp;
                  <Customization onChangeTheme={this.props.onChangeTheme} />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}