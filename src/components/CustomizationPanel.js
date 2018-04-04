import React, { Component } from 'react';
import {
  ListGroupItem, ListGroup, Container, Row, Col, Card, CardImg, CardText, CardTitle, CardSubtitle,
  Button,  ButtonGroup, CardLink} from 'reactstrap';
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
        <h4><i className="fas fa-magic"/>&nbsp;&nbsp;Customize your app</h4>
          <hr className="my-4" />  
          <h4 className="ml-4">Change theme</h4>
          <hr className="my-3 ml-4"/>
          <Row>
            <Col xs="5">
            <ListGroup className="ml-4">
              {themes.map((theme, i) =>
              <ListGroupItem key={i} onClick={() => {
                this.props.onChangeTheme(theme.theme_repertory);
                this.changeCurrentThemeImg(i)
                }} action><i className={theme.theme_icon} />&nbsp;
                {theme.theme_name}
                </ListGroupItem>)}
            </ListGroup>
            <hr className="my-3 ml-4"/>          
            <p className="text-muted ml-4">You can <CardLink tag={Link} to="/login" className="text-info">add your bootswatch theme.</CardLink></p>
            <Button className="ml-4" color="success">Change theme</Button> 
            </Col>
            <Col>
              <Card>
              <CardImg top width="100%" src={this.state.currentThemeImg}/>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
};

export default Customization;