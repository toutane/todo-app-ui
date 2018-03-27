import React from 'react';
import {
  CardTitle, Card, CardText,
  Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';

// import { projects as projectsInit } from '../database/projects'

class ProjectStatue extends React.Component {
  
  constructor(props) {
  
    super(props);

    this.state = {
      project:  false
    };

  };

  render() {
    return (
      <div>
        <Row>
          <Col>
          &nbsp;
            <Card block>
              <div>
                <CardTitle>Signed as <b>Charles Antoine LEGER</b></CardTitle>
                <div><hr className="my-3" /></div>
                <CardText>
                  <b>Charles-Antoine LEGER</b> Hello
                      </CardText>
              </div>
            </Card>
          </Col>
          <Col xs="4"></Col>
        </Row>
      </div>
    );
  };
}

export default ProjectStatue;