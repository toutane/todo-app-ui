import React from 'react';
import {
  Container, Row, Col, CardImg, CardText, CardTitle, Button, Card, CardColumns,
  CardSubtitle, CardImgOverlay, TabContent, TabPane, Nav, NavItem, NavLink,
  ButtonGroup, Badge
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import ProjectPanel from '../components/ProjectPanel'
import Menu from '../10.3-Menu';

export default class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.togglePopover = this.togglePopover.bind(this);

    this.state = {
      activeTab: '1',
      popoverOpen: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  
  render() {
    return (
      <div>
        &nbsp;
      <Container>
          <Row>
            <Col xs="3">
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
                      <ProjectPanel {...this.props}/>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
          </Col>
            <Col>
              <h4><i className="fas fa-inbox fa-fw"/>&nbsp;Inbox -&nbsp;&nbsp;<Badge color="warning">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
              <hr className="my-3" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
};
