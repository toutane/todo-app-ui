import React from 'react';
import { Fade, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import { countBy, sortBy } from 'lodash';
import moment from 'moment';

export default class ProjectsPieChart extends React.Component {
  render() {
    // const projectsActivityData = sortBy(Object.entries(countBy(this.props.projects.map(project => project.project_date))), o => new moment(o[0]).format('YYYYMMDD')).map(x=>({name: x[0], nb: x[1] }));
    const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                    {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                    {name: 'Group C', value: 300},]

    const data02 = [{name: 'A1', value: 100},
                    {name: 'A2', value: 300},
                    {name: 'B1', value: 100},
                    {name: 'B2', value: 80},
                    {name: 'B3', value: 40},
                    {name: 'B4', value: 30},
                    {name: 'B5', value: 50},
                    {name: 'C1', value: 100},
                    {name: 'C2', value: 200},
                    {name: 'D1', value: 150},
                    {name: 'D2', value: 50}]

    const themeColor = ['#DF691A', '#5bc0de', '#5cb85c', '#f0ad4e', '#d9534f'];
    return (
      <div>
          <div className="d-flex justify-content-between">
          <PieChart width={800} height={400}>
            <Pie data={data01} cx={200} cy={200} outerRadius={60} fill="#DF691A" stroke="#2B3E50" strokeWidth={2}>
            {/* {data01.map((x, i) => <Cell fill={themeColor[i % themeColor.length]}/>)} */}
            </Pie>
            <Pie data={data02} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#5bc0de" label stroke="#2B3E50" strokeWidth={2}/>
          </PieChart>
          {/* <Fade>
            <Card className="ml-2 mt-2" style={{"width": "220px"}}>
              <CardBody>
                <CardTitle style={{"fontSize":"18px"}}><i className="fas fa-chart-line fa-fw mr-1"/><span className="text-info">{this.props.user[0].username}</span> projects</CardTitle>
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
          </Fade> */}
        </div>
      </div>
    );
  }
};