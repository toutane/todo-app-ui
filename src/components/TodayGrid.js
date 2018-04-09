import React from 'react';
import { Card, CardImg, CardText,
  CardTitle, CardSubtitle, Button,
  CardHeader, CardBody } from 'reactstrap';

import { tasks } from '../database/tasks';

const TodayGrid = (props) => {
  return (
    <div>
      {/* <Card outline color="secondary">
        {tasks.map((task, i) =>
          <Card outline color={task.task_card_color} key={i}>
            <CardBody>          
            <CardTitle>
              <i className={task.task_card_icon}/>&nbsp;{task.task_title}
            </CardTitle>
            <CardText>
              {task.task_description}
            </CardText>
            </CardBody>            
          </Card>
        )}
      </Card> */}
    </div>
  );
};

export default TodayGrid;