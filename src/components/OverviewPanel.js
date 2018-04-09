import React from 'react';
import {
  Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle, Button, InputGroup, CardFooter,
  FormGroup, Label, InputGroupAddon, InputGroupButton, Input, TabContent, TabPane, Nav, NavItem, NavLink,
  Badge, FormText, Modal, ModalHeader, ModalBody, ModalFooter, Form, CardBody
} from 'reactstrap';
import classnames from 'classnames'
import users from "../database/users"

import { getUser } from '../api/BeAPI'

import Menu from '../10.3-Menu';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      avatarImg: "",
      usernameInput: "",
      fullnameInput: "",
      emailInput: "",
      bioInput: "",
      locationInput: "",
      joindate: ""
    };
  }

  componentDidMount() {
    getUser().then(user => 
      this.setState({
        currentUser: user,
        usernameInput: user.map(user => user.username),
        fullnameInput: user.map(user => user.full_name),
        emailInput: user.map(user => user.email),
        bioInput: user.map(user => user.bio),
        locationInput: user.map(user => user.location),
        avatarImg: user.map(user => user.avatar),
        joindate: user.map(user => user.join_date)     
      })
    )
  }

  render() {

  const currentUser = this.state.currentUser;

    return (
      <div>
        <h4><i className="fas fa-eye"/>&nbsp;&nbsp;Overview</h4>
        <hr className="my-4" />
        <Row>
          <Col>
          <Card>
          <CardBody>
                  {currentUser.map((user, i) =>
                      <div key={i} className="d-flex justify-content-between align-items-start">
                      <div>
                        <CardTitle>
                          Signed as <b>{user.full_name}</b>
                        </CardTitle> 
                          <hr className="my-3"/>
                        <CardText>
                          {user.bio}
                        </CardText>
                      </div>
                      {/* <i className="fas fa-edit fa-lg" onClick={this.editTabFunction}/> */}
                    </div>
                  )}</CardBody>
                  </Card>
                  </Col>
                  <Col xs="4">
                    {/* <Button color="info" onClick={this.logoutFunction}><i className="fas fa-sign-out-alt"></i> Logout</Button> */}
                    <Card>
                    {currentUser.map((user, i) => 
                    <div key={i}>
                      <CardBody>
                      <CardImg top width="100%" src={user.avatar} alt="Card image cap" />
                        <div>&nbsp;</div>
                        </CardBody>
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
            </Col>
          </Row>
      </div>
    );
  }
}