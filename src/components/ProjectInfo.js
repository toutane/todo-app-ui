import React from 'react';
import { Input, InputGroup, CardBody, Card, Button, DropdownToggle,
  DropdownMenu, DropdownItem, ButtonDropdown, ButtonGroup } from 'reactstrap';
import { InputGroupAddon } from '../utils/InputGroupAddon';

import { icons } from "../database/icons";

export default class ProjectInfo extends React.Component {
  constructor(props) {
  super(props);

  this.dropdownActiveFunction = this.dropdownActiveFunction.bind(this);

  this.state = {
    dropdownOpen: false,
    dropSelectItem: "Project icon",
    dropSelectItemIcon: "",
    color: "",
    style: {}
  }
}

  dropdownActiveFunction() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  onAddProjectIcon(icon) {
    this.setState({
      dropSelectItem: icon.icon_name,
      dropSelectItemIcon: icon.icon,
      icon: icon.icon, 
      color: icon.icon_color,
      style: icon.style
    });
  }

  updateProjectFunction() {
    console.log('project successfully updated!')
  }
  
  render() {
    return (
      <div>
        <Card outline color={this.props.project.project_color}>
          <CardBody>
            <span>
              <i className={this.props.project.project_icon} style={this.props.project.project_icon_style}/>
              &nbsp;{this.props.project.project_name}
              <span className="ml-2" style={{fontSize:"13px"}}>create the<a className="ml-1">{this.props.project.project_date}</a></span>
            </span>
            <hr/>
            <InputGroup size="sm" className="d-flex justify-content-between">
              <InputGroupAddon addonType="prepend">
                <i className="fa fa-edit fa-fw" />
              </InputGroupAddon>
              <Input
                placeholder="new project name"
              />
            </InputGroup>
            <ButtonGroup className="mt-2">
              <ButtonDropdown
                size="sm"
                isOpen={this.state.dropdownOpen}
                toggle={this.dropdownActiveFunction}
              >
                <DropdownToggle caret outline color="info">
                  <i className={this.state.dropSelectItemIcon} style={this.state.style}/>{" "}
                  {this.state.dropSelectItem}
                </DropdownToggle>
                <DropdownMenu>
                  {icons.map((icon, i) => (
                    <DropdownItem
                      onClick={() => this.onAddProjectIcon(icon)}
                      key={i}
                    >
                      <i className={icon.icon} style={icon.style}/> {icon.icon_name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>&nbsp;
              <Button color="info" size="sm" onClick={this.updateProjectFunction} className="ml-1">
                <i className="fas fa-check" />&nbsp;Update
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    )
  }
};