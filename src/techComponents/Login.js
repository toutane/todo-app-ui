import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, Button, InputGroup,
  CardSubtitle, CardLink, CardImg, FormGroup, Label,
  InputGroupButton, Input, ButtonGroup, Form, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InputGroupAddon } from '../utils/InputGroupAddon';

// import { postLogin } from "../api/BeAPI";
import { LogContext } from './LoginProvider';
// const { Consumer } = React.createContext();
// import { Consumer } from './Context';



export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameInput: "",
      passwordInput: "",
      isLogged: this.props.isLogged,
      user: "personne-not-logged",
    };

    this.loginFunction = this.loginFunction.bind(this);

  };

  usernameInputFunction(input) {
    this.setState({
      usernameInput: input.target.value
    }
    // console.log(this.state.usernameInput)
  );
  };

  passwordInputFunction(input) {
    this.setState({
      passwordInput: input.target.value
    }
    // console.log(this.state.passwordInput)
  );
  };

  loginFunction(e) {
    e.preventDefault();
    if (this.state.usernameInput !== "") {
      this.props.login(this.state.usernameInput, this.state.passwordInput);
      // this.props.history.push("/today");
    }
  }

  render() {
    return <div>
        <Container>
          <div className="my-5" />
          <div className="d-flex justify-content-center">
            <Row>
              <Col>
                <Card outline color="primary" className="text-center mb-4">
                <CardBody>
                  <CardTitle tag="div"><h4><i className="fas fa-sign-in-alt"/> Login</h4></CardTitle>
                  <hr className="my-3" />
                    <Form onSubmit={e => this.loginFunction(e)}>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>
                          <i className="fas fa-user-circle fa-fw" />
                        </InputGroupAddon>
                        <Input placeholder="username" onChange={input => this.usernameInputFunction(input)} value={this.state.usernameInput} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>
                          <i className="fa fa-key fa-fw" />
                        </InputGroupAddon>
                        <Input placeholder="password" type="password" onChange={input => this.passwordInputFunction(input)} value={this.state.passwordInput} />
                      </InputGroup>
                    </FormGroup>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-center">
                      <Button color="info" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  </CardBody>
                </Card>
                <p>
                  Don't have an todo account yet?<CardLink tag={Link} to="/signup" className="text-info">
                    {" "}
                    Sign up now!
                  </CardLink>
                </p>
                <hr className="my-3" />
                  <Button tag={Link} to="/" outline color="secondary">
                    <i className="fas fa-angle-left" /> Back
                  </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>;
  }
};
