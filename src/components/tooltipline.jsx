import React, { Component } from 'react';

class TooltipLine extends React.Component {
  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    return (
      <p className="line">
        <span className="definition">{this.props.definition}:</span>
        <span className="value">{this.props.value || 'unknown'}</span>
      </p>
    );
  }
}

export default TooltipLine;
