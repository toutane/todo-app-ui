import React, { Component } from 'react';
import {
  ListGroupItem, ListGroup, Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle,
  Pagination, PaginationItem, PaginationLink, Badge, Button, InputGroup, InputGroupAddon, Input,
  Modal, ModalHeader, ModalBody, ModalFooter, Collapse, ButtonGroup,} from 'reactstrap';
import { Link } from 'react-router-dom';

class Customization extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {

    const themes = [
      {
        "theme_name":"Flaty",
        "theme_icon":"fa fa-eye fa-fw text-primary",
        "theme_repertory":"./themes/flaty-theme.min.css"
      },
      {
        "theme_name":"Darkly",
        "theme_icon":"fa fa-user-secret fa-fw text-primary",
        "theme_repertory":"./themes/darkly-theme.min.css"
      },
      {
        "theme_name":"Superhero",
        "theme_icon":"fab fa-superpowers fa-fw text-primary",
        "theme_repertory":"./themes/superhero-theme.min.css"
      },
      {
        "theme_name":"Yeti",
        "theme_icon":"fa fa-snowflake fa-fw text-primary",
        "theme_repertory":"./themes/yeti-theme.min.css"
      },
      {
        "theme_name":"Solar",
        "theme_icon":"fa fa-sun fa-fw text-primary",
        "theme_repertory":"./themes/solar-theme.min.css"
      },
      {
        "theme_name":"Sketchy",
        "theme_icon":"fa fa-pencil-alt fa-fw text-primary",
        "theme_repertory":"./themes/sketchy-theme.min.css"
      },
    ];
    return (
      <div>
        <h4>Personalize with your themes</h4>
        <hr className="my-3" />
        <Row>
          <Col xs="5">
              <ListGroup>
              {themes.map(theme =>
              <ListGroupItem onClick={() => {
                this.props.onChangeTheme(theme.theme_repertory);
                this.toggle()
                }} action><i className={theme.theme_icon} />&nbsp;
                {theme.theme_name}
                </ListGroupItem>)}
            </ListGroup>
          </Col>
          <Col>
          {/* <Collapse isOpen={this.state.collapse}>
            <Card block>
            <Row>
              <Col>
              <i className="fa fa-cog fa-spin fa-5x fa-fw"></i>
              <span className="sr-only">Loading...</span>
              </Col>
              <Col>
              </Col>
            </Row>
            </Card>
          </Collapse> */}
          </Col>
        </Row>
      </div>
    );
  }
};

export default Customization;