import React from "react";
import {
  ButtonGroup,
  Button,
  Card,
  CardTitle,
  CardFooter,
  Collapse,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  CardText,
  Alert,
  InputGroupAddon,
  InputGroup,
  Popover,
  FormFeedback,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
// import shortid from "shortid-36";
import moment from "moment";
import sortBy from "sort-by";

import "react-datepicker/dist/react-datepicker.css";

import { getProjects, getTasks, postTasks, deleteTasks } from "../api/BeAPI";

import ProjectStatue from "./ProjectStatuePanel";
// import { projects } from '../database/projects'
import { tasks as tasksInit } from "../database/tasks";
import Project from "./ProjectPanel";

const priorities = [
  {
    priority_value: 1,
    priority_name: "Priority 1",
    priority_icon: "fas fa-flag"
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

const colors = [
  {
    color_name: "Primary",
    color_icon: "fas fa-circle text-primary"
  },
  {
    color_name: "Secondary",
    color_icon: "fas fa-circle text-secondary"
  },
  {
    color_name: "Success",
    color_icon: "fas fa-circle text-success"
  },
  {
    color_name: "Info",
    color_icon: "fas fa-circle text-info"
  },
  {
    color_name: "Warning",
    color_icon: "fas fa-circle text-warning"
  },
  {
    color_name: "Danger",
    color_icon: "fas fa-circle text-danger"
  }
];

const icons = [
  {
    icon_name: "Clipboard",
    icon: "fa fa-clipboard fa-fw"
  },
  {
    icon_name: "Shopping",
    icon: "fa fa-shopping-cart fa-fw"
  },
  {
    icon_name: "Briefcase",
    icon: "fa fa-briefcase fa-fw"
  },
  {
    icon_name: "Book",
    icon: "fas fa-book fa-fw"
  },
  {
    icon_name: "Utensils",
    icon: "fa fa-utensils fa-fw"
  },
  {
    icon_name: "Earphone",
    icon: "fas fa-headphones fa-fw"
  },
  {
    icon_name: "Eye",
    icon: "fa fa-eye fa-fw"
  },
  {
    icon_name: "Chess",
    icon: "fas fa-chess-knight fa-fw"
  }
];

class TasksPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      tasks: [],
      projects: [],
      moreInformationCollapse: false,
      addTasksModal: false,
      dropdownProject: false,
      advancedOptionsCollapse: false,
      personalizationCollapse: false,
      dropdownSelectProjectOpen: false,
      dropdownSelectPriorityOpen: false,
      dropdownSelectTagOpen: false,
      dropdownSelectColorOpen: false,
      dropdownSelectIconOpen: false,
      allActiveTasks: false,
      dropSelectProject: "Project",
      dropSelectColor: "Color-theme",
      dropSelectColorIcon: "fa fa-paint-brush",
      dropSelectIcon: "Icon",
      dropSelectIconIcon: "fa fa-clipboard",
      dropSelectItemIcon: "fa fa-list",
      prioritySelectIcon: "fa fa-flag",
      tasksTitleInput: "",
      tasksTitleInputInvalid: false,
      tasksDescriptionInput: "",
      selectedDay: moment(),
      selectedTasksInformation: undefined,
      confirmDeleteTasks: undefined,
      activeTasksInformation: false,
      activeTasksDelete: false,
      visibleCross: false,
      search: ""
    };

    this.addTasksModal = this.addTasksModal.bind(this);
    this.dropdownProject = this.dropdownProject.bind(this);
    this.onAddProjectSelected = this.onAddProjectSelected.bind(this);
    this.addTasksFunction = this.addTasksFunction.bind(this);
    this.taskTitleInputFunction = this.taskTitleInputFunction.bind(this);
    this.taskDescriptionInputFunction = this.taskDescriptionInputFunction.bind(
      this
    );
    this.personalizationCollapse = this.personalizationCollapse.bind(this);
    this.advancedOptionsCollapse = this.advancedOptionsCollapse.bind(this);
    this.taskDateInputFunction = this.taskDateInputFunction.bind(this);
    this.dropdownSelectProjectToggle = this.dropdownSelectProjectToggle.bind(
      this
    );
    this.dropdownSelectPriorityToggle = this.dropdownSelectPriorityToggle.bind(
      this
    );
    this.dropdownSelectTagToggle = this.dropdownSelectTagToggle.bind(this);
    this.dropdownSelectColorToggle = this.dropdownSelectColorToggle.bind(this);
    this.dropdownSelectIconToggle = this.dropdownSelectIconToggle.bind(this);
    this.showPrioritySelected = this.showPrioritySelected.bind(this);
    this.showIconSelected = this.showIconSelected.bind(this);
    this.showColorSelected = this.showColorSelected.bind(this);
    this.moreInformationFunction = this.moreInformationFunction.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.deleteTasksFunction = this.deleteTasksFunction.bind(this);
    this.confirmDeleteFunction = this.confirmDeleteFunction.bind(this);
    this.canceVisibleButtons = this.canceVisibleButtons.bind(this);
    this.moreInformationFunction1 = this.moreInformationFunction1.bind(this);
  }

  componentDidMount() {
    getTasks().then(tasks =>
      this.setState({
        tasks: tasks
      })
    );
  }

  canceVisibleButtons() {
    this.setState({
      visibleCross: false
    });
  }

  addTasksModal() {
    this.setState(
      {
        addTasksModal: !this.state.addTasksModal,
        tasksTitleInput: "",
        advancedOptionsCollapse: false,
        personalizationCollapse: false,
        tasksDescriptionInput: "",
        selectedDay: moment()
      },
      () =>
        getProjects().then(resProjects => {
          // console.log(resProjects);
          this.setState({
            projects: resProjects
          })
        }
        )
    );
    console.log(this.state.tasks);
  }

  dropdownProject() {
    this.setState({
      dropdownProject: !this.state.dropdownProject
    });
  }

  onAddProjectSelected(project) {
    this.setState({
      dropSelectProject: project.project_name,
      dropSelectItemIcon: project.project_icon
    });
  }

  addTasksFunction() {
    if (this.state.tasksTitleInput !== "") {
      // pour verifier la date :  && this.state.selectedDay !== ""
      this.setState(
        {
          addTasksModal: !this.state.addTasksModal
        },
        () =>
          postTasks({
            user_id: this.state.userId,
            tasks_id: this.state.tasks.length + 1,
            tasks_title: this.state.tasksTitleInput,
            tasks_description: this.state.tasksDescriptionInput,
            tasks_date: this.state.selectedDay.format("L"),
            tasks_project: this.state.dropSelectProject,
            tasks_project_icon: this.state.dropSelectItemIcon,
            tasks_priority: this.state.prioritySelectIcon,
            tasks_card_color: this.state.dropSelectColor.toLocaleLowerCase(),
            tasks_card_icon: this.state.dropSelectIconIcon
          }).then(data => {
            console.log("retour ", data);
            getTasks().then(tasks =>
              this.setState({
                tasks: tasks
              })
            );
          }),
        {
          dropSelectProject: "Project",
          dropSelectItemIcon: "fa fa-list",
          prioritySelectIcon: "fa fa-flag",
          dropSelectColor: "Color",
          dropSelectColorIcon: "fa fa-paint-brush",
          dropSelectIcon: "Icon",
          dropSelectIconIcon: "fa fa-clipboard",
          activeTasksInformation: false
        }
      );
    } else {
      this.setState(
        {
          tasksTitleInputInvalid: !this.state.tasksTitleInputInvalid
        },
        () => console.log(this.state.tasksTitleInputInvalid)
      );
    }
  }

  deleteTasksFunction(index) {
    this.setState(
      {
        activeTasksDelete: false,
        visibleCross: false
        // tasks: [...this.state.tasks].filter((e, i) => i !== index)
      },
      () =>
        deleteTasks({
          id: index
        }).then(data => {
          getTasks().then(tasks =>
            this.setState({
              tasks: tasks
            })
          );
        })
    );
  }

  confirmDeleteFunction(i) {
    this.setState({
      visibleCross: true,
      confirmDeleteTasks: i,
      activeTasksInformation: false
      // activeTasksDelete: !this.state.activeTasksDelete
    });
  }

  taskTitleInputFunction(input) {
    this.setState({
      tasksTitleInput: input.target.value
    });
    console.log(this.state.tasksTitleInput);
  }

  taskDescriptionInputFunction(input) {
    this.setState({
      tasksDescriptionInput: input.target.value
    });
    console.log(this.state.tasksDescriptionInput);
  }

  taskDateInputFunction(date) {
    this.setState({
      selectedDay: date
    });
  }

  personalizationCollapse() {
    this.setState({
      personalizationCollapse: !this.state.personalizationCollapse
    });
  }

  advancedOptionsCollapse() {
    this.setState({
      advancedOptionsCollapse: !this.state.advancedOptionsCollapse
    });
  }

  dropdownSelectProjectToggle() {
    this.setState({
      dropdownSelectProjectOpen: !this.state.dropdownSelectProjectOpen
    });
  }

  dropdownSelectPriorityToggle() {
    this.setState({
      dropdownSelectPriorityOpen: !this.state.dropdownSelectPriorityOpen
    });
  }

  dropdownSelectTagToggle() {
    this.setState({
      dropdownSelectTagOpen: !this.state.dropdownSelectTagOpen
    });
  }

  dropdownSelectColorToggle() {
    this.setState({
      dropdownSelectColorOpen: !this.state.dropdownSelectColorOpen
    });
  }

  dropdownSelectIconToggle() {
    this.setState({
      dropdownSelectIconOpen: !this.state.dropdownSelectIconOpen
    });
  }

  showPrioritySelected(priority) {
    this.setState({
      prioritySelectIcon: priority.priority_icon
    });
  }

  showIconSelected(icon) {
    this.setState({
      dropSelectIconIcon: icon.icon,
      dropSelectIcon: icon.icon_name
    });
  }

  showColorSelected(color) {
    this.setState({
      dropSelectColorIcon: color.color_icon,
      dropSelectColor: color.color_name
    });
  }

  moreInformationFunction(i) {
    this.setState({
      selectedTasksInformation: i,
      activeTasksInformation: !this.state.activeTasksInformation
    });
    console.log(i);
  }

  moreInformationFunction1() {
    this.setState({
      allActiveTasks: !this.state.allActiveTasks
    });
  }

  updateSearch(event) {
    this.setState({
      activeTasksDelete: false,
      visibleCross: false,
      search: event.target.value.substr(0, 20)
    });
  }

  render() {
    const filteredTasks = this.state.tasks.filter(tasks =>
      tasks.tasks_title.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        <ButtonGroup>
          {/* <h4><Badge color="primary">{this.state.tasks.length}</Badge></h4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
          <InputGroup>
            <InputGroupAddon>
              <i className="fa fa-search fa-fw" />
            </InputGroupAddon>
            <Input
              value={this.state.search}
              onChange={this.updateSearch}
              placeholder="search tasks"
            />&nbsp;
          </InputGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* <Button style={{"backgroundColor":"#0c2461"}} onClick={this.addTasksModal}><i className="fa fa-plus" />&nbsp;Add a tasks</Button> */}
          <Button color="info" onClick={this.addTasksModal}>
            <i className="fa fa-plus" />&nbsp;Add a tasks
          </Button>
          &nbsp;&nbsp;&nbsp;<Button
            outline color="primary"
            onClick={this.moreInformationFunction1}
          >
            <i className="fas fa-ellipsis-v " />
          </Button>
          <Button outline color="primary" onClick={null}>
            <i className="fa fa-trash" />
          </Button>
        </ButtonGroup>
        {/* <ProjectStatue/> */}
        <Modal isOpen={this.state.addTasksModal} toggle={this.addTasksModal}>
          <ModalHeader>
            <i className="fa fa-plus text-info" />&nbsp;Add a tasks
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Tasks title</Label>
                <Input
                  // autoFocus
                  // name='username'
                  // id='username'
                  // innerRef={(input) => (this.username = input)}
                  onChange={input => this.taskTitleInputFunction(input)}
                  value={this.state.tasksTitleInput}
                  // invalid={this.state.tasksTitleInputInvalid}
                />
              </FormGroup>
              <FormGroup>
                <Label>Tasks description</Label>
                <Input
                  type="textarea"
                  onChange={input => this.taskDescriptionInputFunction(input)}
                  value={this.state.tasksDescriptionInput}
                />
              </FormGroup>
              <FormGroup>
                <Label> Tasks date</Label>
                <DatePicker
                  selected={this.state.selectedDay}
                  onChange={this.taskDateInputFunction}
                />
              </FormGroup>
              <hr className="my-3" />
              <Button color="info" onClick={this.advancedOptionsCollapse}>
                <i className="fa fa-cog">&nbsp;</i>Advanced options
              </Button>&nbsp;
              <Button color="success" onClick={this.personalizationCollapse}>
                <i className="fas fa-paint-brush" />&nbsp;Personalization
              </Button>
            </Form>
            <Form>
              <Collapse isOpen={this.state.advancedOptionsCollapse}>
                &nbsp;
                <Card block outline color="info">
                  <Row>
                    <Col xs="6" sm="4">
                      <ButtonDropdown
                        isOpen={this.state.dropdownSelectProjectOpen}
                        toggle={this.dropdownSelectProjectToggle}
                      >
                        <DropdownToggle caret outline color="info">
                          <i className={this.state.dropSelectItemIcon} />{" "}
                          {this.state.dropSelectProject}
                        </DropdownToggle>
                        <DropdownMenu>
                          {this.state.projects.map((project, i) => (
                            <DropdownItem
                              onClick={() => this.onAddProjectSelected(project)}
                              key={i}
                            >
                              <i className={project.project_icon} />&nbsp;{
                                project.project_name
                              }
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Col>
                    <Col xs="6" sm="4">
                      <ButtonDropdown
                        isOpen={this.state.dropdownSelectPriorityOpen}
                        toggle={this.dropdownSelectPriorityToggle}
                      >
                        <DropdownToggle caret outline color="info">
                          <i className={this.state.prioritySelectIcon} />{" "}
                          Priority
                        </DropdownToggle>
                        <DropdownMenu>
                          {priorities.map((priority, i) => (
                            <DropdownItem
                              onClick={() =>
                                this.showPrioritySelected(priority)
                              }
                              key={i}
                            >
                              <i className={priority.priority_icon} />&nbsp;{
                                priority.priority_name
                              }
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Col>
                    <Col sm="4">
                      <ButtonDropdown
                        isOpen={this.state.dropdownSelectTagOpen}
                        toggle={this.dropdownSelectTagToggle}
                      >
                        <DropdownToggle caret outline color="info">
                          <i className="fas fa-tag" /> Tag
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem />
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Col>
                  </Row>
                </Card>
              </Collapse>
              <Collapse isOpen={this.state.personalizationCollapse}>
                &nbsp;
                <Card block outline color="success">
                  <Row>
                    <Col />
                    <Col>
                      <ButtonDropdown
                        isOpen={this.state.dropdownSelectColorOpen}
                        toggle={this.dropdownSelectColorToggle}
                      >
                        <DropdownToggle caret outline color="success">
                          <i className={this.state.dropSelectColorIcon} />{" "}
                          {this.state.dropSelectColor}
                        </DropdownToggle>
                        <DropdownMenu>
                          {colors.map((color, i) => (
                            <DropdownItem
                              onClick={() => this.showColorSelected(color)}
                              key={i}
                            >
                              <i className={color.color_icon} />&nbsp;{
                                color.color_name
                              }
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Col>
                    <Col>
                      <ButtonDropdown
                        isOpen={this.state.dropdownSelectIconOpen}
                        toggle={this.dropdownSelectIconToggle}
                      >
                        <DropdownToggle caret outline color="success">
                          <i className={this.state.dropSelectIconIcon} />{" "}
                          {this.state.dropSelectIcon}
                        </DropdownToggle>
                        <DropdownMenu>
                          {icons.map((icon, i) => (
                            <DropdownItem
                              onClick={() => this.showIconSelected(icon)}
                              key={i}
                            >
                              <i className={icon.icon} />&nbsp;{icon.icon_name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Col>
                    <Col />
                  </Row>
                </Card>
              </Collapse>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.addTasksModal}>
              Cancel
            </Button>
            <Button outline color="info" onClick={this.addTasksFunction}>
              <i className="fa fa-plus" />&nbsp;Add
            </Button>
          </ModalFooter>
        </Modal>
        {/* Test map tasks */}
        <hr className="my-3" />&nbsp;
        {
          filteredTasks.length === 0
          ? (<Alert color="info">
            <h4 className="alert-heading">You have finished your day!</h4>
            <p>
              Well done you don't have tasks to do! #nothingToDo
            </p>
            <hr />
            <p className="mb-0">
              Look in your <a href="/inbox" className="alert-link">box</a> if you have other tasks to do.
            </p>
          </Alert>)
          : (<div></div>) 
        }
        {filteredTasks
          .sort(
            sortBy(
              "tasks_title",
              (key, value) =>
                key === "tasks_title" ? value.toLowerCase() : value
            )
          )
          .map((tasks, i) => (
            <div key={i}>
              <Card block color={tasks.tasks_card_color}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <CardTitle>
                      <div>
                        <i className={tasks.tasks_card_icon} />&nbsp;{
                          tasks.tasks_title
                        }
                      </div>
                    </CardTitle>
                    <CardText onClick={() => this.moreInformationFunction(i)}>
                      <i className="fas fa-ellipsis-v fa-sm text-info" />&nbsp;&nbsp;{
                        tasks.tasks_description
                      }&nbsp;
                      <Collapse
                        isOpen={
                          (i === this.state.selectedTasksInformation &&
                            this.state.activeTasksInformation) ||
                          this.state.allActiveTasks
                        }
                      >
                        <hr className="my-2" />
                        <h6>
                          {tasks.tasks_date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i
                            className={tasks.tasks_project_icon}
                          />&nbsp;{tasks.tasks_project}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i
                            className={tasks.tasks_priority}
                          />
                        </h6>
                      </Collapse>
                    </CardText>
                  </div>
                  <ButtonGroup
                    className={
                      this.state.visibleCross &&
                      i === this.state.confirmDeleteTasks
                        ? "d-flex flex-column align-items-end"
                        : "d-flex flex-column align-items-center"
                    }
                  >
                    <i className="fas fa-check fa-lg mb-2" />

                    {this.state.visibleCross &&
                    i === this.state.confirmDeleteTasks ? (
                      <ButtonGroup>
                        <Button
                          color="danger"
                          outline
                          size="sm"
                          onClick={() => this.deleteTasksFunction(tasks.tasks_id)}
                        >
                          confirm
                        </Button>
                        &nbsp;<Button
                          color="primary"
                          outline
                          size="sm"
                          onClick={() => this.canceVisibleButtons()}
                        >
                          cancel
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <i
                        className="fas fa-times fa-lg mb-1"
                        onClick={() => this.confirmDeleteFunction(i)}
                      />
                    )}
                  </ButtonGroup>
                </div>
              </Card>
              <div>&nbsp;</div>
            </div>
          ))}
      </div>
    );
  }
}
export default TasksPanel;
