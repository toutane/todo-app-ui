import React from 'react';
import { Input, InputGroup, CardBody, Card, Button, DropdownToggle,
  DropdownMenu, DropdownItem, ButtonDropdown, ButtonGroup, Collapse, 
  FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { InputGroupAddon } from '../utils/InputGroupAddon';
import { updateProjects } from "../api/BeAPI";

import { icons } from "../database/icons";

export default class EditProjectModal extends React.Component {
  constructor(props) {
  super(props);

  this.dropdownActiveFunction = this.dropdownActiveFunction.bind(this);
  this.updateProjectFunction = this.updateProjectFunction.bind(this);

  this.state = {
    dropdownOpen: false,
    editModal: true,
    errorName: false,
    dropSelectItem: "Project icon",
    dropSelectItemIcon: "",
    color: "",
    input: "",
    style: {}
  }
}

  dropdownActiveFunction() {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  onAddProjectInput(e) {
    this.setState({
      input: e.target.value,
      errorName: false
    });
  }

  onAddProjectIcon(icon) {
    this.setState({
      dropSelectItem: icon.icon_name,
      dropSelectItemIcon: icon.icon,
      icon: icon.icon, 
      color: icon.icon_color,
    });
  }

  updateProjectFunction(project) {
    if (this.state.input !== "") {
      console.log(project, this.state.icon)
        updateProjects(project._id, {
          project_name: this.state.input,
          project_icon: this.state.icon
        }).then(x => {
          this.setState({
            input: "",
            icon: "",
            dropSelectItem: "Project icon",
            dropSelectItemIcon: "",
            color: "",
            errorName: false
          },
          () => this.props.updateListFunction())
        })
    }
    else {
      this.setState({errorName: true})
    }
  }
  
  render() {
    return (
      <div>
         <Modal isOpen={this.props.isOpenModal}>
          <ModalHeader><i className="fa fa-edit mr-2"/>Edit project</ModalHeader>
          <ModalBody>
          <FormGroup>
              <InputGroup className="d-flex justify-content-between">
              {this.props.project.project_icon !== null
                ? this.state.dropSelectItemIcon === ""
                  ? <InputGroupAddon addonType="prepend">
                      {/* <i className={this.props.project.project_icon} style={this.props.project.project_icon_style}/> */}
                      <i className={this.props.project.project_icon}/>
                    </InputGroupAddon>
                  : <InputGroupAddon addonType="prepend">
                      {/* <i className={this.props.project.project_icon} style={this.props.project.project_icon_style}/> */}
                      <i className={this.state.dropSelectItemIcon}/>
                    </InputGroupAddon>
                : this.state.dropSelectItemIcon === ""
                    ? null
                    : <InputGroupAddon addonType="prepend">
                        {/* <i className={this.props.project.project_icon} style={this.props.project.project_icon_style}/> */}
                        <i className={this.state.dropSelectItemIcon}/>
                      </InputGroupAddon>}
                <Input
                  onChange={e => this.onAddProjectInput(e)}
                  value={this.state.input}
                  placeholder={this.props.project.project_name}
                />
              </InputGroup>
              </FormGroup>
              <ButtonGroup className="d-flex justify-content-between align-items-baseline">
                <ButtonDropdown
                
                  isOpen={this.state.dropdownOpen}
                  toggle={this.dropdownActiveFunction}
                >
                  <DropdownToggle caret outline color="primary">
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
                </ButtonDropdown>
                {this.state.errorName 
                  ? <span className="text-danger mr-3">You must enter a name for your project</span>
                  : null}
              </ButtonGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.setState({input: "", icon: "", dropSelectItem: "Project icon", dropSelectItemIcon: "", color: "", errorName: false}, () => this.props.changeStateModal())}>Cancel</Button>
            <Button color="primary" onClick={() => this.updateProjectFunction(this.props.project)}>Update</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
};