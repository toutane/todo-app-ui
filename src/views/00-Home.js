import React from 'react';
import { Row, Col, Card, CardImg, Container, Jumbotron, Button, Badge,
  ButtonGroup, CardText, CardTitle, InputGroup, InputGroupAddon, InputGroupButton,
  Input, CardBody, Fade, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getLogout, getUser, getProjects } from "../api/BeAPI";

import NavBar from '../02-NavBar';

import SimpleTasksLineChart from '../activity/SimpleTasksLineChart';
import SimpleProjectsLineChart from '../activity/SimpleProjectsLineChart';

import BottomView from '../03-BottomView';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isLogged: false,
      activityView: true,
      currentUser: []
      };
    this.logoutFunction = this.logoutFunction.bind(this)
  }

  componentDidMount() {
    getUser().then(user =>
      this.setState({
        currentUser: user
      }, user.error === undefined
          ? (this.setState({isLogged: true}))
          : (this.setState({isLogged: false}))
    ));
    getProjects().then(resProjects =>
      resProjects.error
        ? this.props.history.push("/login")
        : this.setState({ 
          projects: resProjects,
        }))
  }

  logoutFunction() {
    getLogout().then(response => this.setState({
      isLogged: false
    }));
  }

  render() {

    return (
      <div>
        &nbsp;
        <Container fluid>
          {
            this.state.isLogged
            ? (this.state.currentUser.map((user, i) => <div key={i}>
            <Jumbotron className="text-center">
            <h1 className="display-5">Welcome<span className=" display-3 text-white ml-2">{user.username}</span></h1>
            <span className="lead text-info">{user.full_name}<i className="ml-2 text-muted fas fa-chart-line fa-xs" onClick={() => this.setState({activityView: !this.state.activityView})}/></span> 
            <Collapse isOpen={this.state.activityView}>
              <hr className="my-3 pb-3"/>
              <div className="d-flex justify-content-center">
                <SimpleTasksLineChart/>
                <div className="ml-5 mr-5"></div>
                <SimpleProjectsLineChart projects={this.state.projects}/>
              </div>
            </Collapse>
            <hr className="my-3 pb-3"/>
            <div className="d-flex justify-content-center">
              <ButtonGroup>
                <Button tag={Link} to="/inbox" outline color="primary">See my current tasks</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;<Button tag={Link} to="/today" color="info"><i className="far fa-calendar fa-fw mr-1"/>Today</Button>                
              </ButtonGroup>
            </div>
          </Jumbotron>
          &nbsp;
              <Container>
                <Row>
                  <Col sm="6">
                    <Card outline color="warning" className="text-center">
                    <CardBody>              
                      <CardTitle><i className="fas fa-magic"/> Change the theme</CardTitle>
                      <CardText>Change the theme of your app easily and create own</CardText>
                      <Button outline color="warning" tag={Link} to="/settings">Change theme</Button>
                    </CardBody>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card outline color="success" className="text-center mb-4">
                    <CardBody>              
                      <CardTitle><i className="fas fa-chart-line"/> Activity</CardTitle>
                      <CardText>Observe your daily activity thanks to a system of follow-up</CardText>
                      <Button outline color="success" tag={Link} to="/activities">Activity</Button>
                    </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container></div>))
            : (<Jumbotron className="text-center">
            <h1 className="display-3"><i className="far fa-clipboard fa-sm" />&nbsp;to do-<span className="text-primary">app</span></h1>
            <p className="lead">The app for <span className="text-info">manage</span> your tasks in a moment and <span className="text-info">organize</span> them!</p>
            <hr className="my-2" />&nbsp;
            <Row>
                <Col xs="12" sm="12" md="6" lg="4">
                <h1 className="display-5"><i className="fas fa-chart-line" /></h1>
                <h4 className="display-5">View Your Activity</h4>
                <div className="display-6">
                  <p>Observe your daily activity thanks to a system of follow-up of your actions to improve you in your tasks.</p>
                </div>
                </Col>
                <Col xs="12" sm="12" md="6" lg="4">
                <h1 className="display-5"><i className="fas fa-tasks"/></h1>
                <h4 className="display-5">Organize Your Tasks</h4>
                <div className="display-6">
                  <p>Organize your tasks and your projects easily and quickly and share them with all you want or synchronize them also with all your devices and with your account.</p>
                </div>
                </Col>
                <Col xs="12" sm="12" md="6" lg="4">
                <h1 className="display-5"><i className="fas fa-filter"/></h1>
                <h4 className="display-5">Filter Your Tasks And Project</h4>
                <div className="display-6">
                  <p>Filtrer your tasks and your projects easily and quickly thanks to a complete manager.</p>
                </div>
                </Col>
              </Row>
            &nbsp;<hr className="my-2"/>
            &nbsp;<div className="d-flex justify-content-center">
              <ButtonGroup>
                <Button tag={Link} to="/inbox" outline color="primary">Start to manage your tasks</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;<Button tag={Link} to="/login" color="info"><i className="fas fa-sign-in-alt"></i>&nbsp;Login</Button>                
              </ButtonGroup>
            </div>
          </Jumbotron>)
          }
        </Container>
        &nbsp;
        <BottomView/>
      </div>
    );
  }
};
