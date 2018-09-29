import React from "react";
import {
  ButtonGroup,
  Button,
  Card,
  CardTitle,
  CardBody,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  CardText,
  Alert,
  InputGroup
} from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import sortBy from "sort-by";

import "react-datepicker/dist/react-datepicker.css";
import { InputGroupAddon } from "../utils/InputGroupAddon";
import Radium, { StyleRoot } from "radium";

import { animations } from "../animations/animations";

import {
  getProjects,
  getTasks,
  postTasks,
  deleteTasks,
  completeTasks
} from "../api/BeAPI";

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
  },
  {
    icon_name: "Bug",
    icon: "fas fa-bug fa-fw"
  },
  {
    icon_name: "Beer",
    icon: "fas fa-beer fa-fw"
  },
  {
    icon_name: "Apple",
    icon: "fab fa-apple fa-fw"
  },
  {
    icon_name: "Gfit",

    icon: "fas fa-gift fa-fw"
  }
];

class TasksPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: true,
      userId: "",
      tasks: [],
      projects: [],
      tasksCompletionMode: "all",
      addTasksBoard: false,
      moreInformationCollapse: false,
      addTasksModal: this.props.match.params.action === "add-task",
      dropdownProject: false,
      advancedOptionsCollapse: false,
      personalizationCollapse: false,
      dropdownSelectProjectOpen: false,
      dropdownSelectPriorityOpen: false,
      dropdownSelectTagOpen: false,
      dropdownSelectColorOpen: false,
      dropdownSelectIconOpen: false,
      allActiveTasks: false,
      dropSelectProjectName: "Project",
      dropSelectProject: "Project",
      addTaskModalFooter: "",
      noSelectedProject: false,
      noTaskInput: false,
      dropSelectColor: "Color-theme",
      dropSelectColorIcon: "fa fa-paint-brush",
      dropSelectIcon: "Icon",
      dropSelectIconIcon: "fa fa-clipboard",
      dropSelectItemIcon: "fa fa-list",
      prioritySelectIcon: "fa fa-flag",
      tasksTitleInput: "",
      tasksDescriptionInput: "",
      selectedDay: moment(),
      selectedTasksInformation: undefined,
      confirmDeleteTasks: undefined,
      activeTasksInformation: false,
      activeTasksDelete: false,
      visibleCross: false,
      search: "",
      timeoutNumber: null,
      alphabSortMode: "tasks_title"
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
    this.moreInformationFunction1 = this.moreInformationFunction1.bind(this);
    this.getAllTasksFromAllProjects = this.getAllTasksFromAllProjects.bind(
      this
    );
    this.changeAlphabSortMode = this.changeAlphabSortMode.bind(this);
    this.completeTasksFunction = this.completeTasksFunction.bind(this);
  }

  componentDidMount() {
    this.getAllTasksFromAllProjects();
    this.getProjects();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.action !== prevProps.match.params.action) {
      this.props.match.params.action === "add-task"
        ? this.setState({ addTasksModal: true })
        : null;
    }
    if (this.props.selectedProject !== prevProps.selectedProject) {
      this.props.selectedProject === null
        ? this.getAllTasksFromAllProjects()
        : this.getTasksFromSelectedProjects(this.props.selectedProject);
    }
  }

  getProjects = () => {
    getProjects().then(resProjects => {
      this.setState({ projects: resProjects });
    });
  };

  getAllTasksFromAllProjects() {
    this.setState(
      {
        tasks: [],
        spinner: true
      },
      () =>
        getProjects().then(
          (resProjects = []) =>
            Array.isArray(resProjects) &&
            resProjects.map(project =>
              getTasks(project.project_id).then(tasks =>
                this.setState(
                  {
                    tasks: this.state.tasks.concat(tasks)
                  },
                  this.setState({
                    spinner: false
                  })
                )
              )
            )
        )
    );
  }

  getTasksFromSelectedProjects(selectedProject) {
    this.setState(
      {
        tasks: [],
        spinner: true
      },
      () =>
        getTasks(selectedProject.project_id).then(tasks =>
          this.setState(
            {
              tasks: this.state.tasks.concat(tasks)
            },
            this.setState({
              spinner: false
            })
          )
        )
    );
  }

  addTasksModal() {
    this.setState(
      {
        addTasksModal: !this.state.addTasksModal,
        // addTasksBoard: !this.state.addTasksBoard,
        tasksTitleInput: "",
        advancedOptionsCollapse: false,
        personalizationCollapse: false,
        tasksDescriptionInput: "",
        selectedDay: moment(),
        noTaskInput: false,
        noSelectedProject: false,
        addTaskModalFooter: ""
      },
      () =>
        getProjects().then(resProjects => {
          this.setState({
            projects: resProjects
          });
        })
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
      dropSelectProjectName: project.project_name,
      dropSelectProject: project,
      dropSelectItemIcon: project.project_icon
    });
  }

  addTasksFunction() {
    if (this.state.dropSelectProject !== "Project") {
      if (this.state.tasksTitleInput !== "") {
        // pour verifier la date :  && this.state.selectedDay !== ""
        this.setState(
          {
            addTasksModal: !this.state.addTasksModal
          },
          () =>
            postTasks({
              tasks_id: this.state.tasks.length + 1,
              tasks_title: this.state.tasksTitleInput,
              tasks_description: this.state.tasksDescriptionInput,
              tasks_date: this.state.selectedDay.format("L"),
              tasks_create_date: moment().format("L"),
              tasks_project: this.state.dropSelectProject,
              tasks_project_name: this.state.dropSelectProjectName,
              tasks_project_icon: this.state.dropSelectItemIcon,
              tasks_priority: this.state.prioritySelectIcon,
              tasks_card_color: this.state.dropSelectColor.toLocaleLowerCase(),
              tasks_card_icon: this.state.dropSelectIconIcon
            }).then(data => {
              console.log("retour ", data);
              this.getAllTasksFromAllProjects();
            }),
          {
            dropSelectProject: "Project",
            dropSelectItemIcon: "fa fa-list",
            prioritySelectIcon: "fa fa-flag",
            dropSelectColor: "Color",
            dropSelectColorIcon: "fa fa-paint-brush",
            dropSelectIcon: "Icon",
            dropSelectIconIcon: "fa fa-clipboard",
            activeTasksInformation: false,
            noTaskInput: false,
            noSelectedProject: false,
            addTaskModalFooter: ""
          }
        );
      } else {
        this.setState({
          noTaskInput: true,
          addTaskModalFooter: "d-flex justify-content-between"
        });
      }
    } else {
      this.setState({
        noSelectedProject: true,
        addTaskModalFooter: "d-flex justify-content-between"
      });
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
          this.getAllTasksFromAllProjects();
        })
    );
  }

  confirmDeleteFunction(i) {
    clearTimeout(this.state.timeoutNumber || null);
    this.setState(
      {
        visibleCross: true,
        confirmDeleteTasks: i,
        activeTasksInformation: false
        // activeTasksDelete: !this.state.activeTasksDelete
      },
      () => {
        const num = setTimeout(
          () => this.setState({ visibleCross: false }),
          3000
        );
        this.setState({ timeoutNumber: num });
        // console.log(num);
      }
    );
  }

  taskTitleInputFunction(input) {
    this.setState({
      tasksTitleInput: input.target.value,
      noTaskInput: false,
      addTaskModalFooter: ""
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
      dropdownSelectProjectOpen: !this.state.dropdownSelectProjectOpen,
      noSelectedProject: false,
      addTaskModalFooter: ""
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

  changeAlphabSortMode() {
    this.state.alphabSortMode === "tasks_title"
      ? this.setState({ alphabSortMode: "-tasks_title" })
      : this.setState({ alphabSortMode: "tasks_title" });
  }

  changeCardTextColor(tasks) {
    if (tasks.tasks_card_color === "color-theme") {
      return "";
    } else {
      return "text-white";
    }
  }

  changeEllipsisColor(tasks, icon) {
    if (icon === "ellipsis") {
      if (
        tasks.tasks_card_color === "info" ||
        tasks.tasks_card_color === "success"
      ) {
        return "fas fa-ellipsis-v fa-sm";
      } else {
        return "fas fa-ellipsis-v fa-sm text-info";
      }
    }
    if (icon === "edit") {
      if (
        tasks.tasks_card_color === "info" ||
        tasks.tasks_card_color === "success"
      ) {
        return "fas fa-edit mr-2";
      } else {
        return "fas fa-edit mr-2 text-info";
      }
    }
    if (icon === "check") {
      if (
        tasks.tasks_card_color === "info" ||
        tasks.tasks_card_color === "success"
      ) {
        return "fas fa-check ml-2 mb-1";
      } else {
        return "fas fa-check ml-2 mb-1 text-info";
      }
    }
    if (icon === "times") {
      if (
        tasks.tasks_card_color === "info" ||
        tasks.tasks_card_color === "success"
      ) {
        return "fas fa-times ml-2 mb-1";
      } else {
        return "fas fa-times ml-2 mb-1 text-info";
      }
    }
  }

  completeTasksFunction(tasks) {
    completeTasks(tasks._id, {}).then(x => {
      this.getAllTasksFromAllProjects();
    });
  }

  completionTasksFilterFunction(task) {
    if (this.state.tasksCompletionMode !== "all") {
      return task.tasks_completion === this.state.tasksCompletionMode;
    } else {
      return (
        task.tasks_completion === false ||
        task.tasks_completion === true ||
        task.tasks_completion === undefined
      );
    }
  }

  render() {
    const filteredTasks = this.state.tasks.filter(tasks =>
      tasks.tasks_title.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        <ButtonGroup className="d-flex justify-content-between">
          <div className="d-flex flex-row">
            <InputGroup className="mr-4">
              <InputGroupAddon>
                <i className="fa fa-search fa-fw" />
              </InputGroupAddon>
              <Input
                value={this.state.search}
                onChange={this.updateSearch}
                placeholder="search tasks"
              />
              &nbsp;
            </InputGroup>
            <Button color="info" onClick={this.addTasksModal}>
              <i className="fa fa-plus" />
              &nbsp;Add a tasks
            </Button>
          </div>
          <ButtonGroup>
            <Button
              outline={this.state.tasksCompletionMode === "all" ? false : true}
              color="primary"
              onClick={() => this.setState({ tasksCompletionMode: "all" })}
            >
              <i className="fas fa-th-list fa-fw" />
            </Button>
            <Button
              outline={this.state.tasksCompletionMode === false ? false : true}
              color="primary"
              onClick={() => this.setState({ tasksCompletionMode: false })}
            >
              <i className="fas fa-times fa-fw" />
            </Button>
            <Button
              outline
              outline={this.state.tasksCompletionMode === true ? false : true}
              color="primary"
              onClick={() => this.setState({ tasksCompletionMode: true })}
            >
              <i className="fas fa-check fa-fw" />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button outline color="primary">
              <i className="fa fa-flag fa-fw" />
            </Button>
            {this.state.alphabSortMode === "tasks_title" ? (
              <Button
                outline
                color="primary"
                onClick={() => this.changeAlphabSortMode()}
              >
                <i className="fas fa-sort-alpha-down fa-fw" />
              </Button>
            ) : (
              <Button
                outline
                color="primary"
                onClick={() => this.changeAlphabSortMode()}
              >
                <i className="fas fa-sort-alpha-up fa-fw" />
              </Button>
            )}
            <Button
              outline={!this.state.spinner}
              color="primary"
              onClick={this.moreInformationFunction1}
            >
              {" "}
              {this.state.spinner ? (
                <i className="fas fa-spinner fa-pulse fa-fw" />
              ) : (
                <i className="fas fa-ellipsis-v fa-fw" />
              )}
            </Button>
          </ButtonGroup>
        </ButtonGroup>
        <Modal isOpen={this.state.addTasksModal} toggle={this.addTasksModal}>
          <ModalHeader>
            <i className="fa fa-plus text-info" />
            &nbsp;Add a tasks
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Tasks title</Label>
                <Input
                  onChange={input => this.taskTitleInputFunction(input)}
                  value={this.state.tasksTitleInput}
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
              <Label> Tasks date</Label>
              <FormGroup className="d-flex justify-content-between align-items-center">
                <DatePicker
                  selected={this.state.selectedDay}
                  onChange={this.taskDateInputFunction}
                />
                <ButtonDropdown
                  isOpen={this.state.dropdownSelectProjectOpen}
                  toggle={this.dropdownSelectProjectToggle}
                >
                  <DropdownToggle caret outline color="info">
                    <i className={this.state.dropSelectItemIcon} />{" "}
                    {this.state.dropSelectProjectName}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.projects.map((project, i) => (
                      <DropdownItem
                        onClick={() => this.onAddProjectSelected(project)}
                        key={i}
                      >
                        <i
                          className={project.project_icon}
                          style={project.project_icon_style}
                        />
                        &nbsp;
                        {project.project_name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown
                  isOpen={this.state.dropdownSelectPriorityOpen}
                  toggle={this.dropdownSelectPriorityToggle}
                >
                  <DropdownToggle caret outline color="info">
                    <i className={this.state.prioritySelectIcon} />
                  </DropdownToggle>
                  <DropdownMenu>
                    {priorities.map((priority, i) => (
                      <DropdownItem
                        onClick={() => this.showPrioritySelected(priority)}
                        key={i}
                      >
                        <i className={priority.priority_icon} />
                        &nbsp;
                        {priority.priority_name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown
                  isOpen={this.state.dropdownSelectTagOpen}
                  toggle={this.dropdownSelectTagToggle}
                >
                  <DropdownToggle caret outline color="info">
                    <i className="fas fa-tag" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem />
                  </DropdownMenu>
                </ButtonDropdown>
              </FormGroup>
              <hr className="my-3" />
              <FormGroup className="d-flex justify-content-end">
                <ButtonDropdown
                  className="mr-4"
                  isOpen={this.state.dropdownSelectColorOpen}
                  toggle={this.dropdownSelectColorToggle}
                >
                  <DropdownToggle caret outline color="info">
                    <i className={this.state.dropSelectColorIcon} />
                    &nbsp;
                    {this.state.dropSelectColor}
                  </DropdownToggle>
                  <DropdownMenu>
                    {colors.map((color, i) => (
                      <DropdownItem
                        onClick={() => this.showColorSelected(color)}
                        key={i}
                      >
                        <i className={color.color_icon} />
                        &nbsp;
                        {color.color_name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown
                  isOpen={this.state.dropdownSelectIconOpen}
                  toggle={this.dropdownSelectIconToggle}
                >
                  <DropdownToggle caret outline color="info">
                    <i className={this.state.dropSelectIconIcon} />
                    &nbsp;
                    {this.state.dropSelectIcon}
                  </DropdownToggle>
                  <DropdownMenu>
                    {icons.map((icon, i) => (
                      <DropdownItem
                        onClick={() => this.showIconSelected(icon)}
                        key={i}
                      >
                        <i className={icon.icon} />
                        &nbsp;
                        {icon.icon_name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className={this.state.addTaskModalFooter}>
            {this.state.noSelectedProject ? (
              <span className="text-danger ml-2">
                You must select a project to create task
              </span>
            ) : null}
            {this.state.noTaskInput ? (
              <span className="text-danger ml-2">
                You must enter a name for your task
              </span>
            ) : null}
            <div className="mr-1">
              <Button
                className="mr-1"
                color="secondary"
                onClick={this.addTasksModal}
              >
                Cancel
              </Button>
              <Button outline color="info" onClick={this.addTasksFunction}>
                <i className="fa fa-plus" />
                &nbsp;Add
              </Button>
            </div>
          </ModalFooter>
        </Modal>
        {/* Test map tasks */}
        <hr className="my-4" />
        {/* <AddTasksBoard addTasksBoard={this.state.addTasksBoard} projects={this.state.projects}/> */}
        {filteredTasks.length === 0 && this.state.spinner === false ? (
          <Alert color="info">
            <h4 className="alert-heading">You have finished your day!</h4>
            <p>Well done you don't have tasks to do! #nothingToDo</p>
            <hr />
            <p className="mb-0">
              Look in your{" "}
              <a href="/inbox" className="alert-link">
                box
              </a>{" "}
              if you have other tasks to do.
            </p>
          </Alert>
        ) : (
          <div />
        )}
        {this.state.spinner ? (
          <div />
        ) : (
          filteredTasks
            .sort(
              sortBy(
                this.state.alphabSortMode,
                (key, value) =>
                  key === "tasks_title" ? value.toLowerCase() : value
              )
            )
            .filter(task => this.completionTasksFilterFunction(task))
            .map((tasks, i) => (
              <div key={i}>
                <Card
                  color={tasks.tasks_card_color}
                  className={this.changeCardTextColor(tasks)}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <CardTitle>
                          <div>
                            <i className={`${tasks.tasks_card_icon} mr-1`} />
                            {tasks.tasks_title}
                          </div>
                        </CardTitle>
                        <CardText
                          onClick={() => this.moreInformationFunction(i)}
                          tag="div"
                        >
                          <i
                            className={this.changeEllipsisColor(
                              tasks,
                              "ellipsis"
                            )}
                          />
                          {tasks.tasks_completion ? (
                            <i
                              className={this.changeEllipsisColor(
                                tasks,
                                "check"
                              )}
                            />
                          ) : (
                            <i
                              className={this.changeEllipsisColor(
                                tasks,
                                "times"
                              )}
                            />
                          )}
                          &nbsp;&nbsp;
                          {tasks.tasks_description}
                          &nbsp;
                          <Collapse
                            isOpen={
                              (i === this.state.selectedTasksInformation &&
                                this.state.activeTasksInformation) ||
                              this.state.allActiveTasks
                            }
                          >
                            <hr className="my-2" />
                            <h6 className="d-flex justify-content-between align-items-baseline">
                              <i
                                className={this.changeEllipsisColor(
                                  tasks,
                                  "edit"
                                )}
                              />
                              {tasks.tasks_date}
                              <div className="mr-3 ml-3">
                                <i
                                  className={`${
                                    this.state.projects.filter(
                                      project =>
                                        project.project_id === tasks.project_id
                                    )[0].project_icon
                                  } mr-1`}
                                />
                                {
                                  this.state.projects.filter(
                                    project =>
                                      project.project_id === tasks.project_id
                                  )[0].project_name
                                }
                              </div>
                              <i className={tasks.tasks_priority} />
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
                        <i
                          className="fas fa-check fa-lg mb-2"
                          onClick={() => this.completeTasksFunction(tasks)}
                        />

                        {this.state.visibleCross &&
                        i === this.state.confirmDeleteTasks ? (
                          <StyleRoot>
                            <i
                              style={animations.bounceIn}
                              className="far fa-trash-alt fa-lg"
                              onClick={() =>
                                this.deleteTasksFunction(tasks.tasks_id)
                              }
                            />
                          </StyleRoot>
                        ) : (
                          <i
                            className="fas fa-times fa-lg mb-1"
                            onClick={() => this.confirmDeleteFunction(i)}
                          />
                        )}
                      </ButtonGroup>
                    </div>
                  </CardBody>
                </Card>
                <div>&nbsp;</div>
              </div>
            ))
        )}
      </div>
    );
  }
}
export default TasksPanel;
