import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card,
  Badge, Button, CardTitle, CardText, Row, Col, CardImg, CardImgOverlay,
  CardFooter, ListGroupItem, ListGroup, Jumbotron, Collapse, ButtonGroup, CardBody
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { getProjects, getUser } from "../api/BeAPI";
import { Link } from "react-router-dom";

import Menu from '../10.3-Menu';

import TasksLineChart from '../activity/TasksLineChart';
import ProjectsLineChart from '../activity/ProjectsLineChart';


export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      loadAPI: false,
      tasksCollapse: false,      
      projectsCollapse: false,
    };
  }

  componentWillMount() {
    getProjects().then(resProjects =>
      resProjects.error
        ? this.props.history.push("/login")
        : this.setState({ 
          projects: resProjects,
        }))
  }

  render() {
    return (
      <div>
        &nbsp;
        <Container>
            <Row>
              <Col xs="3">
                <Menu />
                <hr className="my-4"/>
              </Col>
              <Col>
                <h4><i className="fas fa-chart-line fa-fw mr-1"/>Activities -<Badge className="ml-2 mr-2" color="success">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
                <hr className="my-3" />
                <ButtonGroup className="mb-4">
                  <Button onClick={() => this.setState({tasksCollapse: !this.state.tasksCollapse, projectsCollapse: false, loadAPI: true})}>Tasks</Button>
                  <Button className="ml-2" onClick={() => this.setState({projectsCollapse: !this.state.projectsCollapse, tasksCollapse: false, loadAPI: true})}>Projects</Button>
                </ButtonGroup>
                {this.state.loadAPI && this.state.tasksCollapse
                      ? (
                        <Card>
                          <TasksLineChart/>
                        </Card>
                      )
                      : (<div></div>)}
                {this.state.loadAPI && this.state.projectsCollapse
                      ? (<ProjectsLineChart projects={this.state.projects}/>)
                      : (<div></div>)}
            </Col> 
          </Row>
        </Container>
      </div>
    );
  };
};
