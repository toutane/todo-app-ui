import React from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card,
  Badge, Button, CardTitle, CardText, Row, Col, CardImg, CardImgOverlay,
  CardFooter, ListGroupItem, ListGroup, Jumbotron, Collapse, ButtonGroup, CardBody
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { getProjects,  getTasks, getUser } from "../api/BeAPI";
import { Link } from "react-router-dom";

import Menu from '../10.3-Menu';

import GlobalActivity from '../activity/GlobalActivity'
import GlobalBarActivity from '../activity/GlobalBarActivity';
import TasksLineChart from '../activity/TasksLineChart';
import SimpleProjectsLineChart from '../activity/SimpleProjectsLineChart'
import ProjectsLineChart from '../activity/ProjectsLineChart';
import ProjectsPieChart from '../activity/ProjectsPieChart';

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
      activeTab: '1',
      overviewTab: '1'
    };
  }

  componentWillMount() { 
    getProjects().then(resProjects =>
        this.setState({ 
          projects: resProjects,
        }, () => resProjects.map(project =>
          getTasks(project.project_id).then(tasks =>
            this.setState({
              tasks: this.state.tasks.concat(tasks)
            })
          )
        )))
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
                <Menu />
                <hr className="my-4"/>
                {this.state.activeTab === '1'
                    ? (<div>
                        <ListGroup>
                          <ListGroupItem onClick={() => this.setState({ overviewTab: '1' })} action><i className="fas fa-chart-line fa-fw mr-1"/>Global activity</ListGroupItem>                          
                          <ListGroupItem onClick={() => this.setState({ overviewTab: '2' })} action><i className="fas fa-tasks fa-fw mr-1"/>Tasks</ListGroupItem>
                          <ListGroupItem onClick={() => this.setState({ overviewTab: '3' })} action><i className="fa fa-list fa-fw mr-1"/>Projects</ListGroupItem>
                        </ListGroup>
                        <hr className="my-3"/>
                        {this.state.overviewTab === '1'
                          ? <GlobalBarActivity tasks={this.state.tasks} projects={this.state.projects} user={this.props.user}/>
                          : <div></div>}
                      </div>)
                    : (<div></div>)}
              </Col>
              <Col>
                <h4><i className="fas fa-chart-line fa-fw mr-1"/>Activities -<Badge className="ml-2 mr-2" color="primary">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
                <hr className="my-3" />
                <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    <div onClick={() => this.setState({ overviewTab: '1' })}><i className="fa fa-eye" />&nbsp;&nbsp;Overview</div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    <div><i className="fas fa-wrench" />&nbsp;&nbsp;Activities configuration</div>
                    {/* <Badge pill>{user.follower}</Badge> */}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  &nbsp;         
                  {this.state.overviewTab === '1'
                    ? <GlobalActivity tasks={this.state.tasks} projects={this.state.projects} user={this.props.user}/>
                    : <div></div>}       
                  {this.state.overviewTab === '2'
                    ? (<div>
                        <h4><i className="fas fa-tasks"/>&nbsp;&nbsp;Tasks activity</h4>
                        <hr className="my-4" />
                          <TasksLineChart tasks={this.state.tasks} user={this.props.user}/>
                      </div>)
                    : (<div></div>)}
                  {this.state.overviewTab === '3'
                    ? (<div>
                      <hr className="my-4" />
                        <ProjectsLineChart projects={this.state.projects} user={this.props.user}/>
                      <hr className="my-4" />                        
                        {/* <ProjectsPieChart projects={this.state.projects} user={this.props.user}/> */}
                    </div>)
                    : (<div></div>)}
                </TabPane>
                <TabPane tabId="2">
                  &nbsp;                                
                </TabPane>
              </TabContent>
            </Col> 
          </Row>
        </Container>
      </div>
    );
  };
};
