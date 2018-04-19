import React from 'react';
import { Collapse, Card, CardHeader, CardTitle, CardBody, Form, FormGroup,
Label, Input, InputGroup, Button, Row, Col, ButtonGroup,Dropdown, DropdownToggle,
 DropdownMenu, DropdownItem, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { InputGroupAddon } from '../utils/InputGroupAddon';

const priorities = [
  {
    priority_value: 1,
    priority_name: "Priority 1",
    priority_icon: "fa fa-flag"
  },
  {
    priority_value: 2,
    priority_name: "Priority 2",
    priority_icon: "fas fa-flag text-warning"
  },
  {
    priority_value: 3,
    priority_name: "Priority 3",
    priority_icon: "fas fa-flag text-danger"
  }
];

export default class AddTasksBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectDropdownOpen: false,
      imgDropdownOpen: false,
      selectProject: "",
      selectProjectName: "Select project",
      selectProjectIcon: "fa fa-list",
      selectImg: "",
      selectImgName: "Select image",
      selectImgIcon: "far fa-image",
      selectPriorityIcon: "fa fa-flag",
      selectPriorityValue: 1
    }
    this.projectToggle = this.projectToggle.bind(this)
    this.imgToggle = this.imgToggle.bind(this)
    this.priorityToggle = this.priorityToggle.bind(this)
  }

  projectToggle() {
    this.setState({
      projectDropdownOpen: !this.state.projectDropdownOpen
    });
  }

  imgToggle() {
    this.setState({
      imgDropdownOpen: !this.state.imgDropdownOpen
    });
  }

  selectProject(project) {
    this.setState({
      dropSelectProject: project,
      selectProjectName: project.project_name,
      selectProjectIcon: project.project_icon
    });
  }

  priorityToggle() {
    this.setState({
      priorityDropdownOpen: !this.state.priorityDropdownOpen
    });
  }

  selectPriority(priorityValue) {
    priorityValue === 1
    ? (this.setState({ selectPriorityValue: 2, selectPriorityIcon:"fa fa-flag text-warning" }))
    : (priorityValue === 2
      ? (this.setState({ selectPriorityValue: 3, selectPriorityIcon:"fa fa-flag text-danger" }))
      : (this.setState({ selectPriorityValue: 1, selectPriorityIcon:"fa fa-flag" })))
      }
  render() {
    return (
      <div>
         <Collapse isOpen={this.props.addTasksBoard}>
          <Card outline color="primary">
            <CardHeader>
              <i className="fa fa-plus text-info mr-1"/>Add tasks board
            </CardHeader>
            <CardBody>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Label>Tasks title</Label>
                    <Input
                      // onChange={input => this.taskTitleInputFunction(input)}
                      // value={this.state.tasksTitleInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Tasks description</Label>
                    <Input
                      type="textarea"
                      // onChange={input => this.taskDescriptionInputFunction(input)}
                      // value={this.state.tasksDescriptionInput}
                    />
                  </FormGroup>
                </Form>  
              </Col>
              <Col md="4">
                  <div className="d-flex justify-content-center align-items-center">
                    <FormGroup>
                      <Label> Tasks date</Label>
                      <DatePicker
                        // selected={this.state.selectedDay}
                        // onChange={this.taskDateInputFunction}
                        />
                    </FormGroup>
                    <Button outline color="primary" className="ml-3 mt-2"><i className="far fa-calendar"/></Button>
                  </div>
                <hr className="my-1"/>
                <div className="d-flex justify-content-between mt-3 ml-1 mr-1">
                  <Dropdown isOpen={this.state.projectDropdownOpen} toggle={this.projectToggle}>
                    <DropdownToggle caret outline color="primary">
                      <i className={this.state.selectProjectIcon} />
                      &nbsp;&nbsp;{this.state.selectProjectName}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.projects.map((project, i) => (
                        <DropdownItem
                          onClick={() => this.selectProject(project)}
                          key={i}
                        >
                          <i className={project.project_icon} />&nbsp;
                          {project.project_name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Button outline color="primary" onClick={() => this.selectPriority(this.state.selectPriorityValue)}>
                    {priorities.map((priority, i) =>
                     this.state.selectPriorityValue === priority.priority_value
                      ? (<i key={i} className={priority.priority_icon}/>)
                      : (<div key={i}></div>)
                    )}
                  </Button>
                </div>
                <div className="d-flex justify-content-between mt-3 ml-1 mr-1">
                  <Dropdown isOpen={this.state.imgDropdownOpen} toggle={this.imgToggle}>
                    <DropdownToggle caret outline color="primary">
                      <i className={this.state.selectImgIcon} />
                      &nbsp;&nbsp;{this.state.selectImgName}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.projects.map((project, i) => (
                        <DropdownItem
                          onClick={() => this.selectProject(project)}
                          key={i}
                        >
                          <i className={project.project_icon} />&nbsp;
                          {project.project_name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Button outline color="primary">
                    <i className="fa fa-tag"/>                  
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className="d-flex justify-content-end">
              {/* <i className="fa fa-times fa-2x mr-3"/> */}
              <i className="fa fa-plus text-info fa-2x mr-2"/>
            </div>
          </CardFooter>
          </Card>
          <hr className="my-4"/>
        </Collapse>
      </div>
    );
  }
};