import React from 'react';
import { Button, Jumbotron, Col, Row, Container, Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom';

import Menu from './10.3-Menu';
import NavBar from './20-NavBar';
import Settings from './views/04-Settings';

const LogInMenu = (props) => {
  return (
    <div>
      &nbsp;    
      <Container>
        <Row>
          <Col xs="3"><Menu /></Col>
          <Col></Col>
        </Row>
      </Container>
      &nbsp;
    </div>
  );
};

export default LogInMenu;