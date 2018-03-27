import React from 'react';
import {
  Container, Row, Col, CardImg, CardText, CardTitle, Button, Card, CardColumns,
  CardSubtitle, CardImgOverlay, TabContent, TabPane, Nav, NavItem, NavLink,
  ButtonGroup, Badge
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import Menu from '../10.3-Menu';

export default class Activity extends React.Component {

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
              <h4><i className="fas fa-chart-line fa-fw"/>&nbsp;Activities -&nbsp;&nbsp;<Badge color="success">{moment().format('dddd, MMMM Do YYYY')}</Badge></h4>
              <hr className="my-3" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
};
