import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

@observer
class TimeSlider extends React.Component {
  @observable value = 1200;
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

export default TimeSlider;
