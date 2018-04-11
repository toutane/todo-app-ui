import React from 'react';
import { Fade, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Area, linearGradient, AreaChart } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class ProjectLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.projects,
    };
  }

  render() {

    const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYY')).map(x=>({name: x[0], nb: x[1] }));
     
    return (
      <div>
          <div className="d-flex justify-content-between">
            <AreaChart width={560} height={200} data={projectsActivityData}>
            <defs>
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5cb85c" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#5cb85c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis stroke="rgba(255,255,255,0.4)" dataKey="name" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <Area type="monotone" dataKey="nb" stroke="#5cb85c" fillOpacity={1} fill="url(#colorProjects)" />
          </AreaChart>
          <Fade>
            <Card className="ml-2 mt-2" style={{"width": "220px"}}>
              <CardBody>
                <CardTitle style={{"fontSize":"18px"}}><i className="fas fa-chart-line fa-fw mr-1"/>Projects</CardTitle>
                <CardSubtitle className="lead mt-3 text-muted" style={{"fontSize":"12px"}}><i className="fas fa-long-arrow-alt-right text-success mr-1"/>Projects activity</CardSubtitle>
                <CardText tag="div" className="mt-1" style={{"fontSize":"10px"}}>
                  <div>total projects number:<span className="ml-1">{this.state.projects.length}</span></div>
                </CardText>
                <CardSubtitle className="lead mt-3 text-muted" style={{"fontSize":"12px"}}><i className="fas fa-chart-area text-success mr-1"/>Average of your activity</CardSubtitle>                
                <CardText tag="div" className="mt-1" style={{"fontSize":"10px"}}>
                  <div>total projects number:<span className="ml-1">{this.state.projects.length}</span></div>
                </CardText>
              </CardBody>
            </Card>
          </Fade>
        </div>
      </div>
    );
  }
};