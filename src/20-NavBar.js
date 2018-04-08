import React from "react";
import {
  Button,
  InputGroupButton,
  Input,
  InputGroupAddon,
  InputGroup,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media,
  CardImg,
  Container,
  UncontrolledDropdown
} from "reactstrap";
import { Link } from "react-router-dom";
import { getLogout, getUser } from "./api/BeAPI";

import users from "./database/users.js";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      logged: false,
      currentUser: [],
      isOpen: false
    };
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);

    this.stateDropdown = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    getUser().then(user =>
      this.setState({
        currentUser: user
      }, user.error === undefined
          ? (this.setState({logged: true}))
          : (this.setState({logged: false}))
    )
    );
  }

  logoutFunction() {
    getLogout().then(response => this.setState({
      logged: false
    }));
  }

  dropdownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="navbar-dark bg-dark" toggleable>
          <Container>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand tag={Link} to="/home">
              <i className="far fa-clipboard fa-lg" />&nbsp; to do-<span className="text-primary">
                app
              </span>
            </NavbarBrand>
            {this.state.logged
            ? (<Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/settings">
                      <i className="far fa-bell fa-lg mt-2" />
                    </NavLink>
                  </NavItem>
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.dropdownToggle}
                  >
                    {this.state.currentUser.map((user, i) => (
                      <div key={i}>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret key={i}>
                            <img
                              src={user.avatar}
                              className="rounded"
                              height="30"
                              alt="user-name"
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem header key={i}>
                              Signed in as{" "}
                              <b className="text-white"> {user.username}</b>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to="/settings">
                              Your Profile
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to="/settings">
                              <i className="fa fa-cog" /> Settings
                            </DropdownItem>
                            <DropdownItem
                              onClick={this.logoutFunction}
                              tag={Link}
                              to="/home"
                            >
                              <i className="fas fa-sign-out-alt" /> Logout
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    ))}
                  </Dropdown>
                </Nav>
              </Collapse>
            ) : (
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavLink className="mt-2" tag={Link} to="/login">
                    <b>Login</b>
                  </NavLink>
                  <NavLink className="text-muted mt-2">or</NavLink>
                  <NavLink className="mt-2" tag={Link} to="/signup">
                    <b>Sign up</b>
                  </NavLink>
                </Nav>
              </Collapse>
            )}
          </Container>
        </Navbar>
      </div>
    );
  }
}
