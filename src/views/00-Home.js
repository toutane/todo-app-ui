import React from 'react';
import { Row, Col, Card, CardImg, Container, Jumbotron, Button, Badge,
  ButtonGroup, CardText, CardTitle, InputGroup, InputGroupAddon, InputGroupButton,
  Input, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getLogout, getUser } from "../api/BeAPI";

import NavBar from '../02-NavBar';
import BottomView from '../03-BottomView';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isLogged: false,
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
    )
    );
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
            ? (this.state.currentUser.map((user, i) => <Jumbotron key={i} className="text-center">
            <h1 className="display-5">Welcome<span className=" display-3 text-white ml-2">{user.username}</span></h1>
            <p className="lead">The app for <span className="text-info">manage</span> your tasks in a moment and <span className="text-info">organize</span> them!</p>
            &nbsp;<hr className="my-2"/>
            &nbsp;<div className="d-flex justify-content-center">
              <ButtonGroup>
                <Button tag={Link} to="/inbox" outline color="primary">Start to manage your tasks</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;<Button tag={Link} to="/login" color="info"><i className="fas fa-sign-in-alt"></i>&nbsp;Login</Button>                
              </ButtonGroup>
            </div>
          </Jumbotron>))
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
        {/* <Container>
          <Row>
            <Col sm="6">
              <Card outline color="primary" className="text-center mb-4">
              <CardBody>              
                <CardTitle><i className="fab fa-github"/> Support me!</CardTitle>
                <CardText>Support me on GitHub to help me to do this app!</CardText>
                <Button outline color="primary"href="https://github.com/toutane" >View my GitHub!</Button>
              </CardBody>
              </Card>
            </Col>
            <Col sm="6">
              <Card outline color="danger" className="text-center">
              <CardBody>              
                <CardTitle><i className="fas fa-magic"/> Change the theme!</CardTitle>
                <CardText>Change the theme of your app easily and create own!</CardText>
                <Button outline color="danger" tag={Link} to="/settings">Change theme!</Button>
              </CardBody>
              </Card>
            </Col>
          </Row>
        </Container> */}
        <BottomView/>
      </div>
    );
  }
};
