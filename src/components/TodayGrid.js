import React from 'react';
import { Card, CardImg, CardText,
  CardTitle, CardSubtitle, Button,
  CardHeader } from 'reactstrap';

import { tasks } from '../database/tasks';

const TodayGrid = (props) => {
  return (
    <div>
      {/* <Card outline color="secondary">
        {tasks.map((task, i) =>
          <Card block outline color={task.task_card_color} key={i}>
            <CardTitle>
              <i className={task.task_card_icon}/>&nbsp;{task.task_title}
            </CardTitle>
            <CardText>
              {task.task_description}
            </CardText>
          </Card>
        )}
      </Card> */}
    </div>
  );
};

export default TodayGrid;