import React from 'react';
import { Fade } from 'reactstrap';
import { LineChart, Line } from 'recharts';

export default class ProjectLineChart extends React.Component {

  render() {

    const tasksActivityData = [
      {name: 'day 1', tasks: 3},
      {name: 'day 2', tasks: 4},
      {name: 'day 3', tasks: 3},
      {name: 'day 4', tasks: 6},
      {name: 'day 5', tasks: 3},
      {name: 'day 6', tasks: 5},
      {name: 'day 7', tasks: 7},
    ];

    return (
      <div>
        <LineChart width={180} height={150} data={tasksActivityData}>
          <Line type="monotone" dataKey="tasks" stroke="#f0ad4e" dot={false}/>
        </LineChart>
        <Fade>
          <a href="/activities" className="lead text-muted" style={{"fontSize":"14px"}}><i className="fas fa-tasks fa-fw mr-1 mt-3"/>tasks activity</a>          
        </Fade>
      </div>
          );
  }
};