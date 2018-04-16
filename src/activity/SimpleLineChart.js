import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Area, linearGradient, AreaChart } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class SimpleLineChart extends React.Component {
  render() {
    const tasksActivityData = sortBy(Object.entries(countBy(this.props.tasks.map(task => task.tasks_create_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));    
    const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));
    return (
      <div className="d-flex justify-content-center">
        <LineChart width={180} height={130} data={tasksActivityData}>
          <Line type="monotone" dataKey="nb" stroke="#f0ad4e" dot={false} animationBegin={100} isAnimationActive={true}/>
        </LineChart>
        <div className="ml-5">
        <LineChart width={180} height={130} data={projectsActivityData}>
          <Line type="monotone" dataKey="nb" stroke="#5bc0de" dot={false}/>
        </LineChart></div>
      </div>
    );
  }
};