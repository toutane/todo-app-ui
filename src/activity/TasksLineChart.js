import React from 'react';
import { Fade, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Area, linearGradient, AreaChart } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class TasksLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: "#f0ad4e",
      // warning color: #f0ad4e
      // primary color: #DF691A
    };
  }
  render() {
    const tasksActivityData = sortBy(Object.entries(countBy(this.props.tasks.map(task => task.tasks_create_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }))
    return (
      <div>
          <div className="d-flex justify-content-between">
            <AreaChart width={560} height={200} data={tasksActivityData}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={this.state.themeColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={this.state.themeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis stroke="rgba(255,255,255,0.4)" dataKey="name" />
            <YAxis stroke="rgba(255,255,255,0.4)" />
            <CartesianGrid strokeDasharray="3" stroke="rgba(255,255,255,0.4)" opacity={0.4}/>
            <Tooltip wrapperStyle={{"backgroundColor":"#4E5D6C"}} />
            <Area type="monotone" dataKey="nb" stroke={this.state.themeColor} fillOpacity={1} fill="url(#colorTasks)" />
          </AreaChart>
          <Fade>
            <Card className="ml-2 mt-2" style={{"width": "220px"}}>
              <CardBody>
                <CardTitle style={{"fontSize":"18px"}}><i className="fas fa-chart-line fa-fw mr-1"/><span className="text-warning">{this.props.user.username}</span> tasks</CardTitle>
                <CardSubtitle className="lead mt-3 text-muted" style={{"fontSize":"12px"}}>
                  {this.state.themeColor === "#DF691A"
                    ? <div><i className="fas fa-long-arrow-alt-right text-primary mr-1"/>Tasks activity</div>
                    : <div><i className="fas fa-long-arrow-alt-right text-warning mr-1"/>Tasks activity</div>}
                </CardSubtitle>
                <CardText tag="div" className="mt-1" style={{"fontSize":"10px"}}>
                  <div>total tasks number:<span className="ml-1">{this.props.tasks.length}</span></div>
                </CardText>
                <CardSubtitle className="lead mt-3 text-muted" style={{"fontSize":"12px"}}>
                  {this.state.themeColor === "#DF691A"
                      ? <div><i className="fas fa-chart-area text-primary mr-1"/>Average of your activity</div>
                      : <div><i className="fas fa-chart-area text-warning mr-1"/>Average of your activity</div>}
                </CardSubtitle>
                <CardText tag="div" className="mt-1" style={{"fontSize":"10px"}}>
                  <div>total tasks number:<span className="ml-1">{this.props.tasks.length}</span></div>
                </CardText>
              </CardBody>
            </Card>
          </Fade>
        </div>
      </div>
    );
  }
};