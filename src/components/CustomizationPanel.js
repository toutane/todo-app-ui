import React, { Component } from 'react';
import {
  ListGroupItem, ListGroup, Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle,
  Button,  ButtonGroup,} from 'reactstrap';
import { Link } from 'react-router-dom';

const themes = [
  {
    "theme_name":"Superhero",
    "theme_icon":"fab fa-superpowers fa-fw",
    "theme_repertory":"./themes/superhero-theme.min.css",
    "theme_img":"https://bootswatch.com/superhero/thumbnail.png"
  },
  {
    "theme_name":"Darkly",
    "theme_icon":"fa fa-user-secret fa-fw",
    "theme_repertory":"./themes/darkly-theme.min.css",
    "theme_img":"https://bootswatch.com/darkly/thumbnail.png"
  },
  {
    "theme_name":"Flaty",
    "theme_icon":"fa fa-eye fa-fw",
    "theme_repertory":"./themes/flaty-theme.min.css",
    "theme_img":"https://bootswatch.com/flatly/thumbnail.png"
  },
  // {
  //   "theme_name":"Yeti",
  //   "theme_icon":"fa fa-snowflake fa-fw",
  //   "theme_repertory":"./themes/yeti-theme.min.css",
  //   "theme_img":"https://bootswatch.com/darkly/thumbnail.png"
  // },
  // {
  //   "theme_name":"Solar",
  //   "theme_icon":"fa fa-sun fa-fw",
  //   "theme_repertory":"./themes/solar-theme.min.css",
  //   "theme_img":"https://bootswatch.com/darkly/thumbnail.png"
  // },
  // {
  //   "theme_name":"Sketchy",
  //   "theme_icon":"fa fa-pencil-alt fa-fw",
  //   "theme_repertory":"./themes/sketchy-theme.min.css",
  //   "theme_img":"https://bootswatch.com/darkly/thumbnail.png"
  // },
];

class Customization extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      currentThemeImg: "https://bootswatch.com/superhero/thumbnail.png"
     };
  }

  changeCurrentThemeImg(i) {
    this.setState({
      currentThemeImg: themes[i].theme_img
    })
  }

  render() {
    
    return (
      <div>
        <h4>Personalize with your themes</h4>
        <hr className="my-3" />
        <Row>
          <Col xs="5">
              <ListGroup>
              {themes.map((theme, i) =>
              <ListGroupItem onClick={() => {
                this.props.onChangeTheme(theme.theme_repertory);
                this.changeCurrentThemeImg(i)
                }} action><i className={theme.theme_icon} />&nbsp;
                {theme.theme_name}
                </ListGroupItem>)}
            </ListGroup>
            <hr className="my-3"/>
            <Button color="warning"><i className="fas fa-plus"></i> Add your theme</Button>
            {/* &nbsp;
            <p>Add your bootswatch theme!</p> */}
          </Col>
          <Col>
            <Card outline color="primary">
            <CardImg top width="100%" src={this.state.currentThemeImg}/>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Customization;