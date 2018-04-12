import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card,
  Badge, Button, CardTitle, CardText, Row, Col, CardImg, CardImgOverlay,
  CardFooter, ListGroupItem, ListGroup
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getLogout, getUser } from '../api/BeAPI'

import Menu from '../10.3-Menu';
import Customization from '../components/CustomizationPanel';
import Profile from '../components/ProfilePanel';
import Overview from '../components/OverviewPanel';
import Account from '../components/AccountPanel';
import Notifications from '../components/NotificationsPanel';

import Logout from '../techComponents/Logout';
import users from "../database/users.js";
import { LogContext } from '../techComponents/LoginProvider';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.editTabFunction = this.editTabFunction.bind(this)

    this.state = {
      currentUser: [],
      activeTab: '1',
      activeOverview: '1',
      activePersonnal: '1'
    };
  }

  componentDidMount() {
    getUser().then(user =>
      this.setState({
        currentUser: user
      })
    )
  }

  editTabFunction() {
    this.setState({
      activeTab: '2'
    })
  }

  personnalSettingsView(view) {
    this.setState({
      activePersonnal: view
    })
  }

  overviewView(view) {
    this.setState({
      activeOverview: view
    })
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

  const currentUser = this.state.currentUser;

    return (
      <div>
        &nbsp;
      <Container>
          <Row>
            <Col xs="3">
              <Menu/>
                <hr className="my-4"/>
                  {
                    this.state.activeTab === '1'
                    ? (
                      <div>
                        <ListGroup>
                          {/* <ListGroupItem active tag="a" href="#" action>Personal settings</ListGroupItem> */}
                          <ListGroupItem onClick={() => this.overviewView('1')} action><i className="fas fa-eye fa-fw"/>&nbsp; Overview</ListGroupItem>
                          <ListGroupItem onClick={() => this.overviewView('2')} action><i className="fa fa-magic fa-fw"/>&nbsp; Customization</ListGroupItem>
                          <ListGroupItem onClick={() => this.overviewView('3')} action><i className="far fa-bell fa-fw"/>&nbsp; Notifications</ListGroupItem>
                        </ListGroup>
                        <hr className="my-3"/>
                      </div>
                    )
                    :   (
                    <div></div>
                    )
                  }
                  {
                  this.state.activeTab === '2'
                  ? (
                    <div>
                      <ListGroup>
                        <ListGroupItem onClick={() => this.personnalSettingsView('1')} action><i className="fas fa-user-circle fa-fw"/>&nbsp; Profile</ListGroupItem>
                        <ListGroupItem onClick={() => this.personnalSettingsView('2')} action><i className="far fa-address-card fa-fw"/>&nbsp; Account</ListGroupItem>
                      </ListGroup>
                      <hr className="my-3"/>
                    </div>
                  )
                  :   (
                  <div></div>
                  )
                }
              <LogContext>
                <Logout history={this.props.history}/>
              </LogContext>
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
                    <div><i className="fas fa-user-circle" />&nbsp;&nbsp;Personal</div>
                    {/* <Badge pill>{user.follower}</Badge> */}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  &nbsp;
                  {
                    this.state.activeOverview === '1'
                      ? (<LogContext>
                          <Overview/>
                        </LogContext>)
                      : (<div></div>)
                  }
                  {
                    this.state.activeOverview === '2'
                      ? (<Customization onChangeTheme={this.props.onChangeTheme}/>)
                      : (<div></div>)
                  }
                  {
                    this.state.Overview === '3'
                      ? (<Notifications/>)
                      : (<div></div>)
                  }
                </TabPane>
                <TabPane tabId="2">
                  &nbsp;
                {
                  this.state.activePersonnal === '1'
                    ? (<LogContext>
                        <Profile/>
                        </LogContext>)
                    : (<div></div>)
                }
                {
                  this.state.activePersonnal === '2'
                    ? (<Account/>)
                    : (<div></div>)
                }
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}