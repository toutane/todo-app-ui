import React from 'react';
import { Fade, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Area, linearGradient, AreaChart } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class ProjectsLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: "#5bc0de",
      // info color: #5bc0de
      // success color: #5cb85c
    };
  }
  render() {
    const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));
    return (
      <div>
          <div className="d-flex justify-content-start">
            <AreaChart width={560} height={230} data={projectsActivityData}>
            <defs>
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={this.state.themeColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={this.state.themeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis stroke="rgba(255,255,255,0.4)" dataKey="name" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <CartesianGrid strokeDasharray="3" stroke="rgba(255,255,255,0.4)" opacity={0.4}/>
            <Tooltip wrapperStyle={{"backgroundColor":"#4E5D6C"}}/>
            <Area type="monotone" dataKey="nb" stroke={this.state.themeColor} fillOpacity={1} fill="url(#colorProjects)" />
          </AreaChart>
          <Fade>
            <h4 className="ml-4 pb-1"><Badge color="info"><i className="fas fa-chart-line mr-2" />Line chart view</Badge></h4>
            <Card className="ml-4 mt-1" style={{"width": "230px", "height": "170px"}}>
              <CardBody>
                <CardTitle style={{"fontSize":"18px"}}><span className="text-info">{this.props.user.username}</span> projects</CardTitle>
                <CardSubtitle className="lead mt-3 text-muted" style={{"fontSize":"12px"}}>
                  {this.state.themeColor === "#5bc0de"
                    ? <div><i className="fas fa-long-arrow-alt-right text-info mr-1"/>Projects activity</div>
                    : <div><i className="fas fa-long-arrow-alt-right text-success mr-1"/>Projects activity</div>}
                </CardSubtitle>
                <CardText tag="div" className="mt-1" style={{"fontSize":"10px"}}>
                  <div>total projects number:<span className="ml-1">{this.props.projects.length}</span></div>
                </CardText>
                <CardSubtitle className="lead mt-3 text-muted" style={{"fontSize":"12px"}}>
                  {this.state.themeColor === "#5bc0de"
                      ? <div><i className="fas fa-chart-area text-info mr-1"/>Average of your activity</div>
                      : <div><i className="fas fa-chart-area text-success mr-1"/>Average of your activity</div>}
                </CardSubtitle>
                <CardText tag="div" className="mt-1" style={{"fontSize":"10px"}}>
                  <div>total projects number:<span className="ml-1">{this.props.projects.length}</span></div>
                </CardText>
              </CardBody>
            </Card>
          </Fade>
        </div>
      </div>
    );
  }
};