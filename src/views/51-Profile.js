import React from 'react';
import {
  Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle, Button, InputGroup, CardFooter,
  FormGroup, Label, InputGroupAddon, InputGroupButton, Input, TabContent, TabPane, Nav, NavItem, NavLink,
  Badge, FormText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import classnames from 'classnames';
import users from "../database/users";

import Menu from '../10.3-Menu';

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log('modal')
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><i className="fa fa-user-circle" /> Update profile</ModalHeader>
          <ModalBody>
            Be careful you will not be able to go back after this action !
         <div className="d-flex justify-content-center mt-3"><Button outline color='danger' disabled><i className="fa fa-exclamation-triangle"/> You will NOT be able to go back <i className="fa fa-exclamation-triangle"/></Button></div>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={this.toggle}>Update profile</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col>

          </Col>
          <Col xs="4">
            
            &nbsp;
          </Col>
        </Row>
      </div>
    );
  }
}