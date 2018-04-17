import React from 'react';
import { Collapse, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
              <CardTitle className="mt-2"><i className="fa fa-plus text-info mr-1"/>Add tasks board</CardTitle>
            </CardHeader>
            <CardBody>
              Anim pariatur cliche reprehenderit,
              enim eiusmod high life accusamus terry richardson ad squid. Nihil
              anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident.
            </CardBody>
          </Card>
          <hr className="my-4"/>
        </Collapse>
      </div>
    );
  }
};