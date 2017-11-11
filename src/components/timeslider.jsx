import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

@observer
class TimeSlider extends React.Component {
  @observable value = 1300;
  @observable min = 300;
  @observable max = 1300;
  @observable changing = false;

  @action
  handleDrag = e => {
    this.changing = true;
    this.value = e.target.value;
    setTimeout(() => {
      if (this.changing) {
        store.changeDate(parseInt(this.value, 10));
        this.changing = false;
      }
    }, 1000);
  };

  style() {
    return {};
  }

  render() {
    return (
      <div className="time-slider" style={this.style()}>
        <p className="time-slider-row">
          <span className="label">{this.min}</span>
          <span className="slider-wrapper">
            <input
              className="slider is-medium"
              step="1"
              onChange={this.handleDrag}
              min={this.min}
              max={this.max}
              value={this.value}
              type="range"
            />
          </span>
          <span className="label">{this.max}</span>
        </p>
      </div>
    );
  }
}

export default TimeSlider;
