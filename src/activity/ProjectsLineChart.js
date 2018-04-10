import React from 'react';
import { Fade } from 'reactstrap';
import { LineChart, Line } from 'recharts';

export default class ProjectLineChart extends React.Component {

  render() {

    const projectsActivityData = [
      {name: 'day 1', projects: 2},
      {name: 'day 2', projects: 1},
      {name: 'day 3', projects: 1},
      {name: 'day 4', projects: 3},
      {name: 'day 5', projects: 2},
      {name: 'day 6', projects: 2},
      {name: 'day 7', projects: 1},
    ];

    return (
      <div>
        <LineChart width={180} height={150} data={projectsActivityData}>
          <Line type="monotone" dataKey="projects" stroke="#5cb85c" dot={false}/>
        </LineChart>
        <Fade>
          <a href="/activities" className="lead text-muted" style={{"fontSize":"14px"}}><i className="fa fa-list fa-fw mr-1 mt-3"/>projects activity</a>          
        </Fade>
      </div>
          );
  }
};