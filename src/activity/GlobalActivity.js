import React from 'react';
import { Jumbotron, Fade, Alert } from 'reactstrap';
import { LineChart, Line } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';
import { fadeInDown, fadeInUp, fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  fadeInDown: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  },
  fadeInUp: {
    animation: 'x 0.8s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
  },
  fadeIn: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }

}

export default class ProjectsLineChart extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    activeAlert: false
  }
}
  
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
        {
          this.props.tasks.length < 1 || this.props.projects.length < 1
          ? (<Fade>
              <hr />
              <h4 className="alert-heading">You don't have enough tasks and projects!</h4>
              <p className="mb-0">
                To add <span className="text-info">tasks</span> or <span className="text-info">projects</span> go in the Today menu.
              </p>
            </Fade>)
          : (<div>
              <hr className="my-3 pb-3"/>
              <StyleRoot>
                <div style={styles.fadeIn} className="d-flex justify-content-center">
                <LineChart width={100} height={70} data={tasksActivityData}>
                  <Line type="monotone" dataKey="nb" stroke="#f0ad4e" dot={false} animationBegin={100} isAnimationActive={true}/>
                </LineChart>
                <div className="ml-5">
                <LineChart width={100} height={70} data={projectsActivityData}>
                  <Line type="monotone" dataKey="nb" stroke="#5bc0de" dot={false}/>
                </LineChart></div>
                </div>
              </StyleRoot>
              <div className="d-flex justify-content-center">
                <div className="mr-5">
                <Fade>
                  <a className="lead text-muted" style={{"fontSize":"14px"}}><i className="fas fa-tasks fa-fw mr-1 mt-3"/>tasks activity</a>          
                </Fade>
                </div>
                <Fade>
                  <a className="lead text-muted" style={{"fontSize":"14px"}}><i className="fa fa-list fa-fw mr-1 mt-3"/>projects activity</a>          
                </Fade>
              </div>
            </div>)
        }
        <hr className="my-3"/>                                              
    </Jumbotron>
    </div>
    );
  }
};