import React, { Component } from 'react';

class IncrementIcon extends React.Component {
  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    return (
      <span className="icon" onClick={this.props.handleClick}>
        <i className={'time-increment-button ion-' + this.props.icon} />
      </span>
    );
  }
}

export default IncrementIcon;
