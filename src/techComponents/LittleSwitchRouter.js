import React, { Component } from 'react';

class LittleSwitchRouter extends Component {

  render() {
    console.log(this.props)
    return React.Children.map(this.props.children, (child, index) => {
      return (this.props.isLogged == index) ? child : null
  })
}
}

export default LittleSwitchRouter;
