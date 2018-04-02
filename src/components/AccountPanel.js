import React from 'react';
import {
  Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle, Button, InputGroup, CardFooter,
  FormGroup, Label, InputGroupAddon, InputGroupButton, Input, TabContent, TabPane, Nav, NavItem, NavLink,
  Badge, FormText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import classnames from 'classnames'
import users from "../database/users"

import Menu from '../10.3-Menu';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      updateProfileModal: false
    };

    this.updateProfileModalFunction = this.updateProfileModalFunction.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  updateProfileModalFunction() {
    this.setState({
      updateProfileModal: !this.state.updateProfileModal
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card block>{users.map((user, i) =>
              <div key={i}>
                <CardTitle>Signed as <b>{user.full_name}</b></CardTitle>
                <div><hr className="my-3"/></div>
                <CardText>
                  <b>{user.full_name}</b> {user.bio}
                </CardText>
              </div>
            )}</Card>
            &nbsp;
            <Card block outline color="warning">
            <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <InputGroup>
              <InputGroupAddon><i className="fa fa-user-circle fa-fw" /></InputGroupAddon>
              <Input placeholder="username" />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Full name</Label>
            <InputGroup >
              <InputGroupAddon><i className="fa fa-user fa-fw" /></InputGroupAddon>
              <Input placeholder="full name" />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <InputGroup>
              <InputGroupAddon><i className="fa fa-envelope fa-fw" /></InputGroupAddon>
              <Input placeholder="email" />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Bio</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
          {/* <FormGroup>
            <Label for="exampleEmail">Location</Label>
            <InputGroup>
              <InputGroupAddon><i className="fa fa-map-marker fa-fw" /></InputGroupAddon>
              <Input placeholder="location" />
            </InputGroup>
          </FormGroup> */}
          <div><hr className="my-3"/></div>
          <Row>
            <Col>
              <Button color="warning" onClick={this.updateProfileModalFunction}>Update profile</Button>
              <Modal isOpen={this.state.updateProfileModal} toggle={this.updateProfileModalFunction}>
                  <ModalHeader>
                    <i className="fas fa-exclamation-triangle text-danger" />&nbsp;Warning
                    !
                  </ModalHeader>
                  <ModalBody>
                    Are your sure you want to update your profile?
                    <hr />
                    <Button outline color="danger" disabled>Be careful ! This action is IRREVERSIBLE ...</Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.updateProfileModalFunction}>
                      Cancel
                    </Button>
                    <Button color="warning" onClick={this.updateProfileModalFunction}>
                      Update profile
                    </Button>
                  </ModalFooter>
                </Modal>
            </Col>
          </Row>
          </Card>
          &nbsp;&nbsp;
          </Col>
          <Col xs="4">
            <Card block>
              {users.map((user, i) =>
                <div key={i}>
                  <CardImg top width="100%" src={user.avatar} alt="Card image cap" />
                  &nbsp;
                    <CardFooter>
                      <div>
                        <h4><b>{user.full_name}</b></h4>
                        <CardText>
                          <h5>{user.username}</h5>
                          <small><i className="fa fa-map-marker" /> {user.location}</small>
                          <div><small><i className="fa fa-sign-in-alt" /> join the {user.join_date}</small></div>
                        </CardText>
                        {/* &nbsp; <Button outline color="secondary"><i className="fa fa-gear"/></Button> */}
                    </div>
                  </CardFooter>
                </div>
            )}</Card>
            &nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}