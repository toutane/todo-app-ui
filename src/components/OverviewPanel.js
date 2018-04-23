import React from 'react';
import {
  Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle, Button, InputGroup, CardFooter,
  FormGroup, Label, InputGroupAddon, InputGroupButton, Input, TabContent, TabPane, Nav, NavItem, NavLink,
  Badge, FormText, Modal, ModalHeader, ModalBody, ModalFooter, Form, CardBody
} from 'reactstrap';
import classnames from 'classnames'

import Menu from '../10.3-Menu';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user || {},
    };
  }
  render() {
    return (
      <div>
        <h4><i className="fas fa-eye text-primary"/>&nbsp;&nbsp;Overview</h4>
        <hr className="my-4" />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <CardTitle>
                      Signed as <b>{this.state.user.full_name}</b>
                    </CardTitle>
                    <hr className="my-3"/>
                    <CardText>
                      {this.state.user.bio}
                    </CardText>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="4">
            <Card>
              <CardBody>
                <CardImg top width="100%" src={this.state.user.avatar} alt="Card image cap" />
                  <div>&nbsp;</div>
                  </CardBody>
                  <CardFooter>
                    <h4><b>{this.state.user.full_name}</b></h4>
                    <CardText tag="div">
                      <h5>{this.state.user.username}</h5>
                      <small><i className="fa fa-map-marker" /> {this.state.user.location}</small>
                      <div><small><i className="fa fa-sign-in-alt" /> join the {this.state.user.join_date}</small></div>
                    </CardText>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}