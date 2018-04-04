import React from 'react';
import {
  Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle, Button, InputGroup, CardFooter,
  FormGroup, Label, InputGroupAddon, InputGroupButton, Input, TabContent, TabPane, Nav, NavItem, NavLink,
  Badge, FormText, Modal, ModalHeader, ModalBody, ModalFooter, Form, CardLink
} from 'reactstrap';
import classnames from 'classnames'
import users from "../database/users"
import { Link } from "react-router-dom"

import { getUser } from '../api/BeAPI'

import Menu from '../10.3-Menu';

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      usernameInput: "",
      userPassword: "",
      oldPasswordInput: "",
      newPasswordInput: "",
      confirmNewPasswordInput: ""
    };
    this.changePasswordFunction = this.changePasswordFunction.bind(this)
  }

  componentDidMount() {
    getUser().then(user => 
      this.setState({
        currentUser: user,
        usernameInput: user.map(user => user.username),
        userPassword: user.map(user => user.password)        
      },() => console.log(this.state.usernameInput))
    )
  }

  oldPasswordFunction(input) {
    this.setState({
      oldPasswordInput: input.target.value
    })
  }

  newPasswordFunction(input) {
    this.setState({
      newPasswordInput: input.target.value
    },console.log(this.state.newPasswordInput))
  }

  confirmNewPasswordFunction(input) {
    this.setState({
      confirmNewPasswordInput: input.target.value
    })
  }

  changePasswordFunction() {
    if(this.state.newPasswordInput === this.state.confirmNewPasswordInput && this.state.oldPasswordInput === this.state.userPassword) {
      console.log("change password...")
    }
    else {

    }
  }

  render() {

  const currentUser = this.state.currentUser;

    return (
      <div>
        <h4><i className="far fa-address-card"/>&nbsp;&nbsp;Account</h4>
        <hr className="my-4"/>
        <Row>
          <Col>
            <Card block>
            <CardTitle>Change password</CardTitle>
              <Form>
              <hr className="my-2"/>
                <FormGroup>
                  <Label>Old password</Label>
                  <Input 
                    type="password"
                    onChange={input => this.oldPasswordFunction(input)}                    
                    value={this.state.oldPasswordInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>New password</Label>
                  <Input 
                    type="password"
                    onChange={input => this.newPasswordFunction(input)}                    
                    value={this.state.newPasswordInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm new password</Label>
                  <Input 
                    type="password"
                    onChange={input => this.confirmNewPasswordFunction(input)}                    
                    value={this.state.confirmNewPasswordInput}
                  />
                </FormGroup>
              <hr className="my-4"/>                                                
              </Form>
              <Row>
                <Col>
                  <Button color="success" onClick={this.changePasswordFunction}>Update password</Button>
                </Col>
                <Col>
                  {/* <CardLink tag={Link} to="/login" className="text-info"> I forgot my password</CardLink> */}
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </Card>
            <hr className="my-4"/>
            <h4 className="ml-4">Change username</h4>
            <hr className="my-2 ml-4"/>
            <p className="text-muted ml-4">Be careul! This action is irreversible.</p>
            <Button className="ml-4" color="success">Update username</Button> 
            <hr className="my-4"/>
            <h4 className="ml-4">Delete account</h4>
            <hr className="my-2 ml-4"/>
            <p className="text-muted ml-4">Once you delete your account, there is no going back. Please be certain.</p>
            <Button className="ml-4" color="danger">Delete account</Button>         
          </Col>
          <Col xs="4"></Col>
          </Row>
          &nbsp;
      </div>
    );
  }
}