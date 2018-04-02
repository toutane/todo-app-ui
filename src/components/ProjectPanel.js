import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
  Collapse,
  Card,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
// import shortid from "shortid-36";

import { getProjects, postProjects, deleteProjects } from "../api/BeAPI";

import ProjectStatue from "./ProjectStatuePanel";
// import { projects as projectsInit } from '../database/projects'
import { filters as filtersDropdownList } from "../database/filters";
import { icons } from "../database/icons";

const filtersList = [];

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      projectCollapse: false,
      filterCollapse: false,
      trashCollapse: false,
      dropdownAddProjectOpen: false,
      dropdownDeleteProjectOpen: false,
      dropdownFilterOpen: false,
      trashModal: false,
      trashDetectCollapse: false,
      addDetectCollapse: false,
      addFilterDetectCollapse: false,
      addFilterDetectCollapse2: false,
      dropSelectItem: "Project icon",
      dropSelectProject: "Project selected",
      dropSelectFilter: "More filter",
      dropSelectItemIcon: "",
      projects: [],
      filters: filtersList,
      filtersDropdownList: filtersDropdownList,
      input: "",
      icon: "",
      search: ""
    };

    this.projectToggle = this.projectToggle.bind(this);
    this.trashToggle = this.trashToggle.bind(this);
    this.addProjectFunction = this.addProjectFunction.bind(this);
    this.addFilterFunction = this.addFilterFunction.bind(this);
    this.dropdownAddProjectToggle = this.dropdownAddProjectToggle.bind(this);
    this.dropdownDeleteProjectToggle = this.dropdownDeleteProjectToggle.bind(
      this
    );
    this.onAddProjectInput = this.onAddProjectInput.bind(this);
    this.onAddProjectIcon = this.onAddProjectIcon.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.filterToggle = this.filterToggle.bind(this);
    this.deleteFunction = this.deleteFunction.bind(this);
    this.onAddProjectSelected = this.onAddProjectSelected.bind(this);
    this.trashModal = this.trashModal.bind(this);
    this.trashModalBis = this.trashModalBis.bind(this);
    this.dropdownFiltersToggle = this.dropdownFiltersToggle.bind(this);
  }

  componentDidMount() {
    getProjects().then(projects =>
      this.setState({
        projects: projects
      })
    );
  }

  projectToggle() {
    this.setState({
      projectCollapse: !this.state.projectCollapse,
      dropSelectItemIcon: "",
      dropSelectItem: "Project icon",
      addDetectCollapse: false,
      input: ""
    });
  }

  trashToggle() {
    this.setState({
      trashCollapse: !this.state.trashCollapse,
      dropSelectItemIcon: "",
      dropSelectProject: "Project selected",
      trashDetectCollapse: false
    });
  }

  addProjectFunction() {
    if (this.state.input !== "") {
      this.setState(
        {
          projectCollapse: !this.state.projectCollapse,
          dropSelectItemIcon: ""
          // projects: this.state.projects.concat([{
          //   "project_name": this.state.input,
          //   "project_icon": this.state.icon,
          //   "project_url": "/" + this.state.input.toLowerCase().replace(" ", "")
          // }])
        },
        () =>
          postProjects({
            // user_id: this.state.userId,
            project_id: this.state.projects.length + 1,
            project_name: this.state.input,
            project_icon: this.state.icon,
            project_url: "/" + this.state.input.toLowerCase().replace(" ", "")
          }).then(x=>x)
          .then(data => {
            getProjects().then(projects =>
              this.setState({
                projects: projects
              })
            );
          })
      );
    } else {
      this.setState({
        addDetectCollapse: true
      });
    }
    console.log(this.state.projects);
  }

  dropdownAddProjectToggle() {
    this.setState({
      dropdownAddProjectOpen: !this.state.dropdownAddProjectOpen
    });
  }

  addFilterFunction() {
    if (
      this.state.dropSelectFilter !== "More filter" &&
      !this.state.filters.some(
        e => e.filter_name === this.state.dropSelectFilter
      )
    ) {
      this.setState({
        filters: this.state.filters.concat([
          {
            filter_name: this.state.dropSelectFilter,
            filter_icon: this.state.dropSelectItemIcon
          }
        ]),
        dropSelectFilter: "More filter",
        dropSelectItemIcon: ""
      });
    } else {
      if (this.state.dropSelectFilter === "More filter") {
        this.setState({
          addFilterDetectCollapse: true,
          dropSelectItemIcon: ""
        });
      } else {
        this.setState({
          addFilterDetectCollapse2: true,
          dropSelectFilter: "More filter",
          dropSelectItemIcon: ""
        });
      }
    }
  }

  dropdownDeleteProjectToggle() {
    this.setState({
      dropdownDeleteProjectOpen: !this.state.dropdownDeleteProjectOpen,
      trashDetectCollapse: false
    });
  }

  dropdownFiltersToggle() {
    this.setState({
      dropdownFilterOpen: !this.state.dropdownFilterOpen,
      addFilterDetectCollapse: false,
      addFilterDetectCollapse2: false
    });
  }

  onAddProjectInput(e) {
    console.log(e.target.value);
    this.setState({
      input: e.target.value,
      addDetectCollapse: false
    });
  }

  onAddProjectIcon(icon) {
    console.log(icon);
    this.setState({
      dropSelectItem: icon.icon_name,
      dropSelectItemIcon: icon.icon,
      icon: icon.icon
    });
  }

  onAddProjectSelected(project) {
    this.setState({
      dropSelectProject: project.project_name,
      dropSelectItemIcon: project.project_icon
    });
  }

  onFilterSelected(filter) {
    this.setState({
      dropSelectFilter: filter.filter_name,
      dropSelectItemIcon: filter.filter_icon
    });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  filterToggle() {
    this.setState({
      filterCollapse: !this.state.filterCollapse,
      search: ""
    });
  }

  deleteFunction() {
    this.setState(
      {
        trashCollapse: !this.state.trashCollapse,
        trashModal: !this.state.trashModal,
        dropSelectItemIcon: "",
        // projects: [...this.state.projects].filter(
        //   e => e.project_name !== this.state.dropSelectProject
        // ),
      },
      () =>
          deleteProjects({
            project_name: this.state.dropSelectProject,
          }).then(data => {
            getProjects().then(projects =>
              this.setState({
                projects: projects
              })
            );
          }),
    () => console.log(this.state.projects)
    );
  }

  trashModal() {
    if (this.state.dropSelectProject !== "Project selected") {
      this.setState({
        trashModal: !this.state.trashModal
      });
    } else {
      this.setState({
        trashDetectCollapse: true
      });
    }
  }

  trashModalBis() {
    this.setState({
      trashModal: !this.state.trashModal,
      trashCollapse: !this.state.trashCollapse
    });
  }

  render() {
    const filteredProjects = this.state.projects.filter(project =>
      project.project_name
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        {/* Command panel */}

        <ButtonGroup>
          <Button color="info" onClick={this.projectToggle}>
            <i className="fa fa-plus" />&nbsp;Add a project
          </Button>
          &nbsp;&nbsp;&nbsp;<Button outline color="primary" onClick={this.filterToggle}>
            <i className="fa fa-filter" />
          </Button>
          <Button outline color="primary" onClick={this.trashToggle}>
            <i className="fa fa-trash" />
          </Button>
        </ButtonGroup>

        <div>
          {/* Add project menu */}

          <Collapse isOpen={this.state.projectCollapse}>
            &nbsp;
            <Card block outline color="info">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <i className="fa fa-pencil-alt fa-fw" />
                  </InputGroupAddon>
                  <Input
                    onChange={e => this.onAddProjectInput(e)}
                    value={this.state.input}
                    placeholder="project name"
                  />
                </InputGroup>
              </FormGroup>
              <ButtonGroup>
                <ButtonDropdown
                  isOpen={this.state.dropdownAddProjectOpen}
                  toggle={this.dropdownAddProjectToggle}
                >
                  <DropdownToggle caret outline color="secondary">
                    <i className={this.state.dropSelectItemIcon} />{" "}
                    {this.state.dropSelectItem}
                  </DropdownToggle>
                  <DropdownMenu>
                    {icons.map((icon, i) => (
                      <DropdownItem
                        onClick={() => this.onAddProjectIcon(icon)}
                        key={i}
                      >
                        <i className={icon.icon} /> {icon.icon_name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>&nbsp;
                <Button color="info" onClick={this.addProjectFunction}>
                  <i className="fa fa-plus" />&nbsp;Add
                </Button>
              </ButtonGroup>
              <Collapse isOpen={this.state.addDetectCollapse}>
                <hr />
                <p className="text-danger">
                  &nbsp;You must enter a project name !
                </p>
              </Collapse>
            </Card>
          </Collapse>

          {/* Filter project menu */}

          <Collapse isOpen={this.state.filterCollapse}>
            &nbsp;
            <Card block outline color="success">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <i className="fa fa-search fa-fw" />
                  </InputGroupAddon>
                  <Input
                    value={this.state.search}
                    onChange={this.updateSearch}
                    placeholder="search project"
                  />
                </InputGroup>
              </FormGroup>
              {this.state.filters.map((filter, i) => (
                <div key={i}>
                  <ButtonGroup>
                    <Button outline color="success">
                      <i className={filter.filter_icon} />
                      &nbsp;{filter.filter_name}
                    </Button>&nbsp;
                    <Button color="success">
                      <i className="fa fa-filter" />
                    </Button>
                  </ButtonGroup>
                  <div>
                    <hr className="my-2" />{" "}
                  </div>
                </div>
              ))}
              <ButtonGroup>
                <ButtonDropdown
                  isOpen={this.state.dropdownFilterOpen}
                  toggle={this.dropdownFiltersToggle}
                >
                  <DropdownToggle caret outline color="secondary">
                    <i className={this.state.dropSelectItemIcon} />{" "}
                    {this.state.dropSelectFilter}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.filtersDropdownList.map((filter, i) => (
                      <DropdownItem
                        onClick={() => this.onFilterSelected(filter)}
                        key={i}
                      >
                        <i className={filter.filter_icon} />
                        &nbsp;{filter.filter_name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>&nbsp;
                <Button color="success" onClick={this.addFilterFunction}>
                  <i className="fa fa-plus" />&nbsp;Add
                </Button>
              </ButtonGroup>
              <Collapse isOpen={this.state.addFilterDetectCollapse}>
                <hr />
                <p className="text-danger">&nbsp;You must select a filter !</p>
              </Collapse>
              <Collapse isOpen={this.state.addFilterDetectCollapse2}>
                <hr />
                <p className="text-danger">
                  &nbsp;You can't add twice the same project !
                </p>
              </Collapse>
            </Card>
          </Collapse>

          {/* Delete project menu  */}

          <Collapse isOpen={this.state.trashCollapse}>
            &nbsp;
            <Card block outline color="danger">
              <ButtonGroup>
                <ButtonDropdown
                  isOpen={this.state.dropdownDeleteProjectOpen}
                  toggle={this.dropdownDeleteProjectToggle}
                >
                  <DropdownToggle caret outline color="secondary">
                    <i className={this.state.dropSelectItemIcon} />{" "}
                    {this.state.dropSelectProject}
                  </DropdownToggle>
                  <DropdownMenu>
                    {filteredProjects.map((project, i) => (
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
                </ButtonDropdown>&nbsp;
                <Button color="danger" onClick={this.trashModal}>
                  <i className="fa fa-trash" />
                </Button>
                <Modal isOpen={this.state.trashModal} toggle={this.trashModal}>
                  <ModalHeader>
                    <i className="fas fa-exclamation-triangle text-danger" />&nbsp;Warning
                    !
                  </ModalHeader>
                  <ModalBody>
                    Are you sure to delete the project:&nbsp;&nbsp;<i
                      className={this.state.dropSelectItemIcon}
                    />&nbsp;
                    {this.state.dropSelectProject}&nbsp;<hr />
                    <Button outline color="danger" disabled>Be careful ! This action is IRREVERSIBLE ...</Button>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.trashModalBis}>
                      Cancel
                    </Button>
                    <Button
                      outline
                      color="danger"
                      onClick={this.deleteFunction}
                    >
                      <i className="fa fa-trash" />&nbsp;Delete
                    </Button>
                  </ModalFooter>
                </Modal>
              </ButtonGroup>
              <Collapse isOpen={this.state.trashDetectCollapse}>
                <hr />
                <p className="text-danger">&nbsp;You must select a project !</p>
              </Collapse>
            </Card>
          </Collapse>
        </div>

        <div>&nbsp;</div>

        {/* Project list */}

        <ListGroup>
          {filteredProjects.map((project, i) => (
            <ListGroupItem
              tag={Link}
              to={project.project_url}
              // action={this.state.advancedProjectOptionsFunction}
              action
              key={i}
            >
              <i className={project.project_icon} />
              &nbsp;{project.project_name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Project;
