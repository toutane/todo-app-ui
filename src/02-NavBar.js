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
import { LogOff } from './techComponents/LoginProvider';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isLogged: this.props.isLogged,
      currentUser: this.props.user,
      isOpen: false,
      isOpen2: false
    };
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.dropdownToggle2 = this.dropdownToggle2.bind(this);
    this.logoutFunction = this.logoutFunction.bind(this);

    this.stateDropdown = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    // getUser().then(user =>
    //   this.setState({
    //     currentUser: user
    //   }, user.error === undefined
    //       ? (this.setState({isLogged: true}))
    //       : (this.setState({isLogged: false}))
    // )
    // );
  }

  logoutFunction() {
    getLogout().then(response => this.setState({
      isLogged: false
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
  dropdownToggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }

  toggle2() {
    this.setState({
      isOpen2: !this.state.isOpen2
    });
  }
  render() {
    return (
      <div>
        <Navbar className="navbar-dark bg-dark" expand="md">
          <Container>
            <NavbarToggler onClick={this.toggle} />
            <NavbarBrand tag={Link} to="/home">
              <i className="far fa-clipboard fa-lg" />&nbsp; to do-<span className="text-primary">
                app
              </span>
            </NavbarBrand>

            {this.props.isLogged
            ? (
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/settings">
                      <i className="far fa-bell fa-lg mt-1" />
                    </NavLink>
                  </NavItem>
                  <Dropdown
                    isOpen={this.state.dropdownOpen2}
                    toggle={this.dropdownToggle2}
                  >
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            <i className="fa fa-plus fa-lg mt-1" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem tag={Link} to="/today">
                              {/* <i className="fa fa-tasks"/> */}
                              New task
                            </DropdownItem>
                            <DropdownItem tag={Link} to="/today">
                              {/* <i className="fa fa-list"/> */}
                              New project
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                  </Dropdown>
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.dropdownToggle}
                  >
                      <div>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            <img
                              src={this.props.user.avatar}
                              className="img-rounded"
                              height="26"
                              alt="user-name"
                            />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem header>
                              Signed in as{" "}
                              <b className="text-white"> {this.props.user.username}</b>
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
                              onClick={this.props.logoff}
                              tag={Link}
                              to="/home"
                            >
                              <i className="fas fa-sign-out-alt" /> Logout
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
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
