import React from 'react';
import {
  Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle, Button, InputGroup, CardFooter,
  FormGroup, Label, InputGroupButton, Input, TabContent, TabPane, Nav, NavItem, NavLink,
  Badge, FormText, Modal, ModalHeader, ModalBody, ModalFooter, Form, CardBody
} from 'reactstrap';
import classnames from 'classnames'
import users from "../database/users"
import { InputGroupAddon } from '../utils/InputGroupAddon';

import Menu from '../10.3-Menu';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user || {},
      avatarImg: this.props.user.avatar,
      usernameInput: this.props.user.username,
      fullnameInput: this.props.user.full_name,
      emailInput: this.props.user.email,
      bioInput: this.props.user.bio,
      locationInput: this.props.user.location,
      joindate: this.props.user.join_date,
    };
  }

  fullnameInputFunction(input) {
    this.setState({
      fullnameInput: input.target.value
    })
  }

  emailInputFunction(input) {
    this.setState({
      emailInput: input.target.value
    })
  }

  bioInputFunction(input) {
    this.setState({
      bioInput: input.target.value
    })
  }

  locationInputFunction(input) {
    this.setState({
      locationInput: input.target.value
    })
  }

  // avatarImgFunction(img) {
  //   this.setState({
  //     avatarImg: img.target.value
  //   },() => console.log(this.state.avatarImg))
  // }

  render() {
    return (
      <div>
        <h4><i className="fas fa-user-circle"/>&nbsp;&nbsp;Profile</h4>
        <hr className="my-4" />
        <Row>
          <Col>
            <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    onChange={input => this.fullnameInputFunction(input)}
                    value={this.state.fullnameInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    onChange={input => this.emailInputFunction(input)}
                    value={this.state.emailInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Bio</Label>
                  <Input
                    type="textarea"
                    onChange={input => this.bioInputFunction(input)}
                    value={this.state.bioInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    onChange={input => this.locationInputFunction(input)}
                    value={this.state.locationInput}
                  />
                </FormGroup>
                <hr className="my-2"/>
                <FormGroup>
                  <Label>Avatar</Label>
                  <Input
                    type="file"
                    onChange={img => this.avatarImgFunction(img)}
                  />
                </FormGroup>
              <hr className="my-4"/>
              </Form>
              <Row>
                <Col>
                  <Button color="success" onClick={this.updateProfileFunction}>
                    Update profile
                  </Button>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              </CardBody>
            </Card>
            &nbsp;
          </Col>
          <Col xs="4">
            <Card>
                <div>
                  <CardBody>
                  <CardImg top width="100%" src={this.state.avatarImg} alt="Card image cap" />
                    <div>&nbsp;</div>
                  </CardBody>
                    <CardFooter>
                    <div>
                      <h4><b>{this.state.fullnameInput}</b></h4>
                      <CardText tag="div">
                        <h5>{this.state.usernameInput}</h5>
                        <small><i className="fa fa-map-marker" /> {this.state.locationInput}</small>
                        <div><small><i className="fa fa-sign-in-alt" /> join the {this.state.joindate}</small></div>
                      </CardText>
                    </div>
                  </CardFooter>
                </div>
            </Card>
            </Col>
          </Row>
      </div>
    );
  }
}