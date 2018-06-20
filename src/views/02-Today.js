import React from 'react';
import {
  Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import Menu from '../10.3-Menu';
import ProjectPanel from '../components/ProjectPanel'
import TasksPanelManager from '../components/TasksPanelManager'
import TodayGrid from '../components/TodayGrid'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      selectedProject: null,
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  setSelectedProject(project) {
    if (project !== "today") {
      this.setState({selectedProject: project})
    }
    else {
      this.setState({selectedProject: null})
    }
  }


  render() {
    // console.log(this.props);
    return (
      <div>
        &nbsp;
      <Container>
          <Row>
            <Col xs="3">
              {/* <ConectionsManager/>&nbsp; */}
              <Menu />
              &nbsp;
          <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    <i className="far fa-clipboard" />
                    &nbsp;Project
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    <i className="fa fa-tag" />
                    &nbsp;Tag
            </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      &nbsp;
                      <ProjectPanel setSelectedProject={(project) => this.setSelectedProject(project)} {...this.props}/>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
              &nbsp;
          </Col>
            <Col>
              <h4>
              {this.state.selectedProject === null
                  ? <span>
                      <i className="far fa-calendar fa-fw mr-1"/>TODAY -
                      <Badge className="ml-2 mr-2" color="primary">
                        {moment().format('dddd, MMMM Do YYYY')}
                      </Badge>
                    </span>
                  : <span>
                      <i className={`${this.state.selectedProject.project_icon} mr-1`} style={this.state.selectedProject.project_icon_style}/>{this.state.selectedProject.project_name} - 
                      <Badge className="ml-2 mr-2" color="primary">
                        {moment().format('dddd, MMMM Do YYYY')}
                      </Badge>
                    </span>}
              </h4>
              <hr className="my-3" />
                <TasksPanelManager {...this.props} selectedProject={this.state.selectedProject}/>
              <hr className="my-3" />
              <TodayGrid />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
};
