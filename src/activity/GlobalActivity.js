import React from 'react';
import { Jumbotron } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Area, linearGradient, AreaChart } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';
import { fadeInDown, fadeInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  fadeInDown: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  fadeInUp: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
  }

}

export default class ProjectsLineChart extends React.Component {
  render() {
    const tasksActivityData = sortBy(Object.entries(countBy(this.props.tasks.map(task => task.tasks_create_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));    
    const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));
    return (
      <div>
      <h4><i className="fas fa-chart-line"/>&nbsp;&nbsp;Global activity</h4>
      <hr className="my-4" />
      <Jumbotron className="text-center">
         <div className="d-flex justify-content-center align-items-baseline">
          <StyleRoot>                            
            <h1 style={styles.fadeInUp} className="display-3 text-info mr-2">{this.props.user.username}</h1>
          </StyleRoot>
          <StyleRoot>
            <h1 style={styles.fadeInDown}>activities</h1>
          </StyleRoot>
         </div>
      <hr className="my-3 pb-3"/>
      <div className="d-flex justify-content-center">
      <LineChart width={100} height={70} data={tasksActivityData}>
        <Line type="monotone" dataKey="nb" stroke="#f0ad4e" dot={false} animationBegin={100} isAnimationActive={true}/>
      </LineChart>
      <div className="ml-5">
      <LineChart width={100} height={70} data={projectsActivityData}>
        <Line type="monotone" dataKey="nb" stroke="#5bc0de" dot={false}/>
      </LineChart></div>
      </div>
      <hr className="my-3"/>                                              
      {/* <div className="d-flex justify-content-center">
        <ButtonGroup>
          <Button tag={Link} to="/inbox" outline color="warning"><i className="fas fa-tasks mr-1"/>Tasks</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;<Button className="ml-4" tag={Link} to="/today" outline color="info"><i className="fas fa-list mr-1"/>Projects</Button>
        </ButtonGroup>
      </div> */}
    </Jumbotron>
    </div>
    );
  }
};