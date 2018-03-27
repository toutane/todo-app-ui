import React from 'react';
import {
  Container, Row, Col, CardImg, CardText, CardTitle, Button, Card, CardColumns,
  CardSubtitle, CardImgOverlay, TabContent, TabPane, Nav, NavItem, NavLink,
  ButtonGroup, Badge
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import Menu from '../10.3-Menu';
import ProjectPanel from '../components/ProjectPanel'
import TasksPanelManager from '../components/TasksPanelManager'
import TodayGrid from '../components/TodayGrid'
import ConectionsManager from '../components/ConectionsManager'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
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
  render() {
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
                      <ProjectPanel />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
              &nbsp;
          </Col>
            <Col>
              <h4><i className="far fa-calendar fa-fw" />&nbsp;Today -&nbsp;&nbsp;<Badge color="info">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
              <hr className="my-3" />
              <TasksPanelManager />
              <hr className="my-3" />
              <TodayGrid />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
};
