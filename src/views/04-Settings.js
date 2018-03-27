import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card,
  Badge, Button, CardTitle, CardText, Row, Col, CardImg, CardImgOverlay } from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import Menu from '../10.3-Menu';
import Profile from './51-Profile';
import Account from './52-Account'
import Customization from './53-Customization';

import users from "../database/users.js"

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
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
            <Col xs="3"><Menu /></Col>
            <Col>
              <h4><i className="fa fa-cog fa-fw" />&nbsp;Settings -&nbsp;&nbsp;<Badge color="danger">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
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
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}
                  >
                    <div><i className="fa fa-user-circle" />&nbsp;&nbsp;Profile</div>
                    {/* <Badge pill>{user.publication}</Badge>*/}
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
                      <div><hr className="my-3" /></div>
                      <CardText>
                        <b>{user.full_name}</b> {user.bio}
                      </CardText>
                    </div>
                  )}</Card>
                  </Col>
                  <Col xs="4"></Col>
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
                <TabPane tabId="4">
                  &nbsp;
                <Profile/>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}