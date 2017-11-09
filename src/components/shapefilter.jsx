import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

@observer
class ShapeFilter extends React.Component {
  style() {
    return {};
  }

  render() {
    return (
      <div className="time-slider" style={this.style()}>
        <input
          className="slider is-fullwidth"
          step="1"
          onChange={this.handleDrag}
          min={500}
          max={1300}
          value={this.value}
          type="range"
        />
      </div>
    );
  }
}

export default ShapeFilter;
