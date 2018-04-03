import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card,
  Badge, Button, CardTitle, CardText, Row, Col, CardImg, CardImgOverlay,
  CardFooter
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getLogout, getUser } from '../api/BeAPI'

import Menu from '../10.3-Menu';
import Customization from '../components/CustomizationPanel';
import Personal from '../components/PersonalPanel';
import Logout from '../techComponents/Logout';

import users from "../database/users.js"

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.editTabFunction = this.editTabFunction.bind(this)

    this.state = {
      activeTab: '1',
      currentUser: []
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
                <hr className="my-3"/>        
              <Logout history={this.props.history}/>
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
                  <div>
                  <Card block>
                  {currentUser.map((user, i) =>
                      <div key={i} className="d-flex justify-content-between align-items-start">
                      <div>
                        <CardTitle>
                          Signed as <b>{user.full_name}</b>
                        </CardTitle> 
                          <hr className="my-3"/>
                        <CardText>
                          {user.bio}
                        </CardText>
                      </div>
                      {/* <i className="fas fa-edit fa-lg" onClick={this.editTabFunction}/> */}
                    </div>
                  )}</Card>
                  </div>
                  </Col>
                  <Col xs="4">
                    {/* <Button color="info" onClick={this.logoutFunction}><i className="fas fa-sign-out-alt"></i> Logout</Button> */}
                    <Card block>
                    {currentUser.map((user, i) => 
                    <div key={i}>
                      <CardImg top width="100%" src={user.avatar} alt="Card image cap" />
                        <div>&nbsp;</div>
                        <CardFooter>
                        <div>
                          <h4><b>{user.full_name}</b></h4>
                          <CardText>
                            <h5>{user.username}</h5>
                            <small><i className="fa fa-map-marker" /> {user.location}</small>
                            <div><small><i className="fa fa-sign-in-alt" /> join the {user.join_date}</small></div>
                          </CardText>
                          {/* &nbsp; <Button outline color="secondary"><i className="fa fa-gear"/></Button> */}
                        </div>
                      </CardFooter>
                    </div>
                    )}</Card>
                  </Col>
                  <hr className="my-3"/>
                  {/* <Button>Logout</Button> */}
                </Row>
                </TabPane>
                <TabPane tabId="2">
                  &nbsp;
                <Personal/>
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