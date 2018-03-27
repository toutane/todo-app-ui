import React from 'react';
import { Button, InputGroupButton, Input, InputGroupAddon, InputGroup, Collapse,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink, Media, CardImg, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import users from './database/users.js'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.stateDropdown= {
      dropdownOpen: false
    };

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
      <Navbar color="faded" light toggleable>
      <Container>
      <NavbarToggler right onClick={this.toggle} />
      <NavbarBrand tag={Link} to="/logout"><i className='far fa-clipboard fa-lg text-primary'/>&nbsp; To do </NavbarBrand>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem><NavLink tag={Link} to="/messages"><i className="far fa-bell"/></NavLink></NavItem>
        {/* {users.map(user =>
        <div className="d-flex justify-content-end">
        <NavItem><CardImg width="5%" src={user.avatar} alt={user.username} /></NavItem>
        </div>)} */}
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
        {users.map((user, i) =>
        <DropdownToggle nav caret key={i}>
          {user.username}
        </DropdownToggle>)}
        <DropdownMenu right>
        {users.map((user, i) => 
        <DropdownItem header key={i}>Signed in as <b>{user.full_name}</b></DropdownItem>)}
        <DropdownItem divider />
          <DropdownItem tag={Link} to="/settings">Your Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/settings">Settings</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </Nav>
      </Collapse>
      </Container>
    </Navbar>
    )
  }
}
