import React from 'react';
import { Fade } from 'reactstrap';
import { LineChart, Line } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class SimpleProjectLineChart extends React.Component {

  render() {

    const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));

    return (
      <div>
        <LineChart width={180} height={130} data={projectsActivityData}>
          <Line type="monotone" dataKey="nb" stroke="#5bc0de" dot={false}/>
        </LineChart>
        <Fade>
          <a href="/activities" className="lead text-muted" style={{"fontSize":"14px"}}><i className="fa fa-list fa-fw mr-1 mt-3"/>projects activity</a>          
        </Fade>
      </div>
          );
  }
};