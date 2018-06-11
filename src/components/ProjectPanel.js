import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
  Collapse,
  Card,
  CardBody,
  FormGroup,
  InputGroup,
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
  Col,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { InputGroupAddon } from '../utils/InputGroupAddon';
import moment from "moment";
import { getProjects, postProjects, deleteProjects } from "../api/BeAPI";
// import shortid from "shortid-36";

import ProjectStatue from "./ProjectStatuePanel";
// import { projects as projectsInit } from '../database/projects'
import { filters as filtersDropdownList } from "../database/filters";
import { icons } from "../database/icons";

const filtersList = [];

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      deleteCross: false,
      indexDeleteCross: false,
      projectCollapse: this.props.match.params.action === 'add-project' ,
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
      dropSelectProjectId: "",
      projects: [],
      filters: filtersList,
      filtersDropdownList: filtersDropdownList,
      input: "",
      icon: "",
      color: "",
      style: {},
      search: ""
    };

    this.projectToggle = this.projectToggle.bind(this);
    this.addProjectFunction = this.addProjectFunction.bind(this);
    this.addFilterFunction = this.addFilterFunction.bind(this);
    this.dropdownAddProjectToggle = this.dropdownAddProjectToggle.bind(this);
    this.onAddProjectInput = this.onAddProjectInput.bind(this);
    this.onAddProjectIcon = this.onAddProjectIcon.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.filterToggle = this.filterToggle.bind(this);
    this.deleteFunction = this.deleteFunction.bind(this);
    this.onAddProjectSelected = this.onAddProjectSelected.bind(this);
    this.trashModal = this.trashModal.bind(this);
    this.dropdownFiltersToggle = this.dropdownFiltersToggle.bind(this);
    this.getAllProject = this.getAllProject.bind(this);
    this.setDeleteCross = this.setDeleteCross.bind(this);
  }

  componentDidMount() {
    this.getAllProject();
    this.props.match.params.action === 'add-project' ? this.setState ({ projectCollapse: true}) : null
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.action !== prevProps.match.params.action) {
      this.props.match.params.action === 'add-project' ? this.setState ({ projectCollapse: true}) : null
    }
  }

  getAllProject() {
    this.setState({
      spinner: true
    },
    () => getProjects().then(resProjects =>
      resProjects.error
        ? this.props.history.push("/login")
        : this.setState({
          projects: resProjects,
          spinner: false
        })
    ))
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
        () => postProjects({
            project_color: this.state.color,
            project_name: this.state.input,
            project_icon: this.state.icon,
            project_icon_style: this.state.style,
            project_date: moment().format("L"),
            project_url: "/" + this.state.input.toLowerCase().replace(" ", "")
          }).then(x=>x)
          .then(data => {
            getProjects().then(projects =>
              this.setState({
                projects: projects
              }, () => this.props.history.push("/today"))
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
      icon: icon.icon, 
      color: icon.icon_color,
      style: icon.style
    });
  }

  onAddProjectSelected(project) {
    this.setState({
      dropSelectProject: project.project_name,
      dropSelectItemIcon: project.project_icon,
      style: project.project_icon_style
    });
  }

  onFilterSelected(filter) {
    this.setState({
      dropSelectFilter: filter.filter_name,
      dropSelectItemIcon: filter.filter_icon,
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

  trashModal(project) {
    this.setState({
      trashModal: !this.state.trashModal,
      dropSelectProject: project.project_name,
      dropSelectItemIcon: project.project_icon,
      dropSelectProjectId: project.project_id,
      style: project.project_icon_style
    })
  }

  deleteFunction() {
    this.setState({
      trashModal: !this.state.trashModal
    },  
    () => deleteProjects({
          project_id: this.state.dropSelectProjectId
        }).then(() => getProjects().then(projects =>
            this.setState({
              projects: projects
            }, () => console.log(this.state.projects))
          ))
    )}

  setDeleteCross(index, toggle) {
    this.setState({deleteCross: toggle, indexDeleteCross: index})
  }

  render() {
    const filteredProjects = this.state.projects.length && this.state.projects.filter(project =>
      project.project_name
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    ) || [];

    return (
      <div>
        {/* Command panel */}

        <ButtonGroup>
          <Button color="info" onClick={this.projectToggle}>
            <i className="fa fa-plus fa-fw" />&nbsp;Add a project
          </Button>
          &nbsp;&nbsp;&nbsp;<Button outline={!this.state.spinner} color="primary" onClick={this.filterToggle}>
          {this.state.spinner
            ? (<i className="fas fa-spinner fa-pulse fa-fw"/>)
            : (<i className="fa fa-filter fa-fw"/>)}
          </Button>
          <Button outline color="primary">
            <i className="fa fa-trash fa-fw" />
          </Button>
        </ButtonGroup>

        <div>
          {/* Add project menu */}

          <Collapse isOpen={this.state.projectCollapse}>
            &nbsp;
            <Card outline color="info">
            <CardBody>
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
              </CardBody>
            </Card>
          </Collapse>

          {/* Filter project menu */}

          <Collapse isOpen={this.state.filterCollapse}>
            &nbsp;
            <Card outline color="success">
            <CardBody>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
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
                  <DropdownToggle caret outline color="success">
                    <i className={this.state.dropSelectItemIcon} style={this.state.style}/>{" "}
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
              </CardBody>
            </Card>
          </Collapse>


          
          <Modal isOpen={this.state.trashModal} toggle={this.trashModal}>
            <ModalHeader>
              <i className="fas fa-exclamation-triangle text-danger" />&nbsp;Warning
              !
            </ModalHeader>
            <ModalBody>
              Are you sure to delete the project:&nbsp;&nbsp;
              <i className={this.state.dropSelectItemIcon} style={this.state.style}/>&nbsp;
              {this.state.dropSelectProject}&nbsp;<hr />
              <Button outline color="danger" disabled>Be careful ! This action is IRREVERSIBLE ...</Button>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.trashModal}>
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
        </div>

        <div>&nbsp;</div>

        {/* Project list */}

          {
            filteredProjects.length === 0 && this.state.spinner === false
            ? (<Alert color="info">
            <h4 className="alert-heading">No project!</h4>
            <hr/>
            <p className="mb-0">
              Add a project if you want to organise and add tasks.
            </p>
          </Alert>)
          : (
            <ListGroup>
              {filteredProjects.map((project, i) => (
                <ListGroupItem
                  action
                  key={i}
                  className="d-flex justify-content-between align-items-center"
                  onMouseEnter={(e) => this.setDeleteCross(i, true)}
                  onMouseLeave={(e) => this.setDeleteCross(i, false)}
                >
                  <div>
                    <i className={project.project_icon} style={project.project_icon_style}/>
                    &nbsp;{project.project_name}
                  </div>
                  {/* <i className="fas fa-times" onClick={() => this.deleteFunction(project.project_name)}/> */}
                  {(this.state.indexDeleteCross === i) && this.state.deleteCross && <i className="fas fa-times" onClick={() => this.trashModal(project)}/>}
                </ListGroupItem>
              ))}
            </ListGroup>
          )
          }
      </div>
    );
  }
}

export default Project;
