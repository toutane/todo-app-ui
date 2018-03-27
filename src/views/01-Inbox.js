import React from 'react';
import {
  Container, Row, Col, CardImg, CardText, CardTitle, Button, Card, CardColumns,
  CardSubtitle, CardImgOverlay, TabContent, TabPane, Nav, NavItem, NavLink,
  ButtonGroup, Badge
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import Menu from '../10.3-Menu';

export default class Inbox extends React.Component {

  render() {
    return (
      <div>
        &nbsp;
      <Container>
          <Row>
            <Col xs="3">
              <Menu />
              &nbsp;
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
