import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  return (
    <div>
      <Row>
        <Col>
        <ListGroup>
          <ListGroupItem tag={Link} to="/inbox" action><i className="fa fa-inbox fa-fw"/>&nbsp; Inbox</ListGroupItem>
          <ListGroupItem tag={Link} to="/today" action><i className="far fa-calendar fa-fw"/>&nbsp; Today</ListGroupItem>
          <ListGroupItem tag={Link} to="/activities" action><i className="fas fa-chart-line fa-fw"/>&nbsp; Activities</ListGroupItem>
          {/* <ListGroupItem tag={Link} to="/nextweek" action><i className="far fa-sticky-note fa-fw"/>&nbsp; Note</ListGroupItem> */}
          <ListGroupItem tag={Link} to="/settings" action><i className="fa fa-cog fa-fw"/>&nbsp; Settings</ListGroupItem>
        </ListGroup>
        </Col>
      </Row>
    </div>
    
  );
};

export default Menu;