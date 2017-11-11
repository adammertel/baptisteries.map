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
        <div className="columns">
          <div className="column is-1 column-label column-label-left">
            <div className="label">{this.min}</div>
          </div>
          <div className="column is-10">
            <div className="slider-wrapper">
              <input
                className="slider is-fullwidth"
                step="1"
                onChange={this.handleDrag}
                min={this.min}
                max={this.max}
                value={this.value}
                type="range"
              />
            </div>
          </div>
          <div className="column is-1 column-label column-label-right">
            <div className="label">{this.max}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSlider;
