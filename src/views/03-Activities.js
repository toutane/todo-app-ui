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
      currentUser: [],
      projects: [],
      loadAPI: false,
      activeTab: '1',
      overviewTab: '1'
    };
  }

  componentWillMount() {
    getUser().then(user =>
      this.setState({
        currentUser: user
      })
    )
    getProjects().then(resProjects =>
      resProjects.error
        ? this.props.history.push("/login")
        : this.setState({ 
          projects: resProjects,
        }))
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
                          <ListGroupItem onClick={() => this.setState({ overviewTab: '1' })} action><i className="fas fa-chart-line text-primary fa-fw mr-1"/>Global activity</ListGroupItem>                          
                          <ListGroupItem onClick={() => this.setState({ overviewTab: '2' })} action><i className="fas fa-tasks fa-fw mr-1"/>Tasks</ListGroupItem>
                          <ListGroupItem onClick={() => this.setState({ overviewTab: '3' })} action><i className="fa fa-list fa-fw mr-1"/>Projects</ListGroupItem>
                        </ListGroup>
                        <hr className="my-3"/>
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
                    <div><i className="fa fa-eye" />&nbsp;&nbsp;Overview</div>
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
                    ? <div>
                        <h4><i className="fas fa-chart-line text-primary"/>&nbsp;&nbsp;Global activity</h4>
                        <hr className="my-4" />
                      </div>
                    : <div></div>}       
                  {this.state.overviewTab === '2'
                    ? (<div>
                        <h4><i className="fas fa-tasks"/>&nbsp;&nbsp;Tasks activity</h4>
                        <hr className="my-4" />
                        <Card>
                          <TasksLineChart/>
                        </Card>
                      </div>)
                    : (<div></div>)}
                  {this.state.overviewTab === '3'
                    ? (<div>
                      <h4><i className="fa fa-list"/>&nbsp;&nbsp;Projects activity</h4>
                      <hr className="my-4" />
                      <ProjectsLineChart projects={this.state.projects} user={this.state.currentUser}/>
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
