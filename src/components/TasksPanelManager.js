import React from 'react';
import {
  Container, Row, Col, CardImg, CardText, CardTitle, Button, Card, CardColumns,
  CardSubtitle, CardImgOverlay, TabContent, TabPane, Nav, NavItem, NavLink,
  ButtonGroup
} from 'reactstrap';
import classnames from 'classnames';

import AddTasksPanel from '../components/AddTasksPanel'

export default class TasksPanelGestion extends React.Component {
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <i className="fas fa-tasks" />
              &nbsp;&nbsp;&nbsp;Tasks manager
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <i className="far fa-sticky-note" />
              &nbsp;&nbsp;&nbsp;Note manager
            </NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <i className="fas fa-wrench" />
              &nbsp;&nbsp;&nbsp;Tasks configuration
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">&nbsp;
            <AddTasksPanel/>
          </TabPane>
        </TabContent>
        &nbsp;
      </div>
    );
  };
};
