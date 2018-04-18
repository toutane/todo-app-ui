import React from 'react';
import { Collapse, Card, CardHeader, CardTitle, CardBody, Form, FormGroup,
Label, Input, InputGroup, Button, Row, Col, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { InputGroupAddon } from '../utils/InputGroupAddon';

export default class AddTasksBoard extends React.Component {
  constructor(props) {
    super(props);

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
                  {/* <hr className="my-3"/>
                  <Button color="info" onClick={this.advancedOptionsCollapse}>
                    <i className="fa fa-cog">&nbsp;</i>Advanced options
                  </Button>&nbsp;
                  <Button color="success" onClick={this.personalizationCollapse}>
                    <i className="fas fa-paint-brush" />&nbsp;Personalization
                  </Button> */}
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
                    <Button outline color="primary" className="ml-3 mt-2"><i className="fa fa-list fa-fw"/></Button>
                  </div>
                <hr className="my-1"/>
                {/* <div className="d-flex justify-content-between">
                <ButtonGroup vertical>
                  <Button outline color="primary"><i className="fa fa-list fa-fw"/></Button>
                  <Button className="mt-3" outline color="primary"><i className="fa fa-list fa-fw"/></Button>
                </ButtonGroup>
                <ButtonGroup vertical>
                  <Button outline color="primary"><i className="fa fa-list fa-fw"/></Button>
                  <Button className="mt-3" outline color="primary"><i className="fa fa-list fa-fw"/></Button>
                </ButtonGroup>
                <ButtonGroup vertical>
                  <Button outline color="primary"><i className="fa fa-list fa-fw"/></Button>
                  <Button className="mt-3" outline color="primary"><i className="fa fa-list fa-fw"/></Button>
                </ButtonGroup>
                </div> */}
              </Col>
            </Row>
          </CardBody>
          </Card>
          <hr className="my-4"/>
        </Collapse>
      </div>
    );
  }
};