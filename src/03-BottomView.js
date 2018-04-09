import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const BottomView = (props) => {
  return (
    <div> 
      <hr className="mb-4"/>
        <Container>
          <div className="d-flex justify-content-center text-muted">
              Made with <i className="fas fa-heart text-danger mt-1 ml-1 mr-1"/> by <a href="https://github.com/toutane" className="text-white ml-1 mr-1">toutane</a> & <a href="https://github.com/le-du6" className="text-white ml-1">le-du6</a> 
          </div>
        </Container>
      &nbsp;
    </div>
  );
};

export default BottomView;