
import React from 'react';
import { Fade, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class GlobalBarActivity extends React.Component {
  render() {
    const tasksActivityData = sortBy(Object.entries(countBy(this.props.tasks.map(task => task.tasks_create_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));    
    const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));
    const data = [
      {date: '04/14/2018', nb_tasks: 4, nb_projects: 2},
      {date: '04/14/2018', nb_tasks: 3, nb_projects: 1},
      {date: '04/14/2018', nb_tasks: 2, nb_projects: 9},
      {date: '04/14/2018', nb_tasks: 2, nb_projects: 3},
      {date: '04/14/2018', nb_tasks: 1, nb_projects: 4},
      {date: '04/14/2018', nb_tasks: 2, nb_projects: 3},
      {date: '04/14/2018', nb_tasks: 3, nb_projects: 4},
];
    return (
      <div>
        <BarChart width={260} height={155} data={data}>
          {/* <XAxis stroke="rgba(255,255,255,0.4)" />
          <YAxis stroke="rgba(255,255,255,0.4)" /> */}
          <CartesianGrid strokeDasharray="3" stroke="rgba(255,255,255,0.4)" opacity={0.4}/>
          <Bar dataKey="nb_tasks" fill="#f0ad4e" />
          <Bar dataKey="nb_projects" fill="#5bc0de" />
        </BarChart>
      </div>
    );
  }
};