import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, Button, InputGroup,
  CardSubtitle, CardLink, CardImg, FormGroup, Label, InputGroupAddon,
  InputGroupButton, Input, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

import { postLogin } from "../api/BeAPI";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameInput: "",
      passwordInput: ""
    };

    this.loginFunction = this.loginFunction.bind(this);    

  };

  usernameInputFunction(input) {
    this.setState({
      usernameInput: input.target.value
    },
    // console.log(this.state.usernameInput)
  );  
  };

  passwordInputFunction(input) {
    this.setState({
      passwordInput: input.target.value
    },
    // console.log(this.state.passwordInput)
  );
  };

  loginFunction() {
    if (this.state.usernameInput !== "") {
      this.setState(
      {},
      () =>
        postLogin({
         username: this.state.usernameInput,
         password: this.state.passwordInput         
        }).then(response => this.props.history.push("/today"))
      );
    } else {
      this.setState(
        {}
      );
    }
  }

  render() {
    return (
      <div>
        <Container>
          <div className="my-5"></div>
          <div className="d-flex justify-content-center">
            <Row>
              <Col>
                <Card block outline color="primary" className="text-center mb-4">
                  <CardTitle><i className="fas fa-sign-in-alt"/> Login</CardTitle>
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
                  <hr className="my-2"/>
                  <div className="d-flex justify-content-center">                 
                      <Button color="info" onClick={this.loginFunction}>Login</Button>
                  </div>
                </Card>
                <p>Don't have an todo account yet?<CardLink tag={Link} to="/signup" className="text-info"> Sign up now!</CardLink></p>                
                <hr className="my-3"/>
                  <Button tag={Link} to="/" outline color="secondary"><i className="fas fa-angle-left"></i> Back</Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
};
