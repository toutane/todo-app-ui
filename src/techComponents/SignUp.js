import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, Button, InputGroup,
  CardSubtitle, CardLink, CardImg, FormGroup, Label,
  InputGroupButton, Input, ButtonGroup, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from "moment";
import { InputGroupAddon } from '../utils/InputGroupAddon';

import { postSignUp } from "../api/BeAPI";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameInput: "",
      fullnameInput: "",
      emailInput: "",
      passwordInput: "",
      registerError: ""
    };

    this.registerFunction = this.registerFunction.bind(this)

  };

  usernameInputFunction(input) {
    this.setState({
      usernameInput: input.target.value
    });  
  };

  fullnameInputFunction(input) {
    this.setState({
      fullnameInput: input.target.value
    });  
  };

  emailInputFunction(input) {
    this.setState({
      emailInput: input.target.value
    });  
  };

  passwordInputFunction(input) {
    this.setState({
      passwordInput: input.target.value
    });
  };

  registerFunction() {
      this.setState({ }, () => postSignUp({
         username: this.state.usernameInput,
         full_name: this.state.fullnameInput,
         email: this.state.emailInput,
         password: this.state.passwordInput,
         join_date: moment().format("L")         
        })
        .then(data => {
          data.error 
            ? this.setState({registerError: data.message})
            : this.props.history.push("/login")
        })
      );
  }

  render() {
    return (
      <div>
        <Container>
          <div className="my-5"></div>
          <div className="d-flex justify-content-center">
            <Row>
              <Col>
                <Card outline color="primary" className="text-center mb-4" style={{"width": "335px"}}>
                <CardBody>                
                  <CardTitle tag="div"><h4><i className="fas fa-user-circle fa-fw"/> Create your account</h4></CardTitle>
                  <hr className="my-3"/>
                  <FormGroup>
                    <InputGroup >
                      <InputGroupAddon><i className="fas fa-user-circle fa-fw" /></InputGroupAddon>
                      <Input 
                      placeholder="username"
                      onChange={input => this.usernameInputFunction(input)}
                      value={this.state.usernameInput}                      
                       />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup >
                      <InputGroupAddon><i className="far fa-address-card fa-fw" /></InputGroupAddon>
                      <Input 
                      placeholder="full name"
                      onChange={input => this.fullnameInputFunction(input)}
                      value={this.state.fullnameInput}                      
                       />
                    </InputGroup>
                    </FormGroup>
                  <FormGroup>
                    <InputGroup >
                      <InputGroupAddon><i className="far fa-envelope fa-fw" /></InputGroupAddon>
                      <Input 
                      placeholder="email"
                      onChange={input => this.emailInputFunction(input)}
                      value={this.state.emailInput}                      
                       />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon><i className="fa fa-key fa-fw" /></InputGroupAddon>
                      <Input 
                      placeholder="password" 
                      type="password" 
                      onChange={input => this.passwordInputFunction(input)}
                      value={this.state.passwordInput}                      
                      />
                    </InputGroup>
                  </FormGroup>
                  <span className="text-danger text-wrap" >{this.state.registerError}</span>
                  <hr className="my-2"/>
                  <div className="d-flex justify-content-center">
                      <Button color="info" onClick={this.registerFunction}>Create account</Button>                   
                  </div>
                  </CardBody>
                </Card>
                <p>Already have an account with us?<CardLink tag={Link} to="/login" className="text-info"> Login</CardLink> instead.</p>
                <hr className="my-3"/>
                  {/* <Button tag={Link} to="/" outline color="secondary"><i className="fas fa-angle-left"></i> Back</Button> */}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
};
