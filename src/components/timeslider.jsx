import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

@observer
class TimeSlider extends React.Component {
  @observable min = 240;
  @observable max = 1200;
  @observable from = 240;
  @observable to = 1200;
  @observable changing = false;

  getDateValue = mode => {
    return parseInt(mode === 'from' ? this.from : this.to, 10);
  };

  changeDateValue = (mode, newValue) => {
    if (mode === 'from') {
      if (newValue > this.to) {
        newValue = this.to - 1;
      }
    } else {
      if (newValue < this.from) {
        newValue = this.from + 1;
      }
    }
    this[mode] = newValue;
  };

  @action
  handleDrag = (mode, e) => {
    this.changing = true;
    this.changeDateValue(mode, parseInt(e.target.value, 10));
    setTimeout(() => {
      if (this.changing) {
        store.changeDate(this.getDateValue(mode), mode);
        this.changing = false;
      }
    }, 1000);
  };

  style() {
    return {};
  }

  render() {
    return (
      <div className="time-slider-wrapper" style={this.style()}>
        <div className="time-slider">
          <span className="label slider-name">from {store.dateFrom}</span>
          <p className="time-slider-row">
            <span className="label max-min-label min-label">{this.min}</span>
            <span className="slider-wrapper">
              <input
                className="slider is-medium"
                step="1"
                onChange={this.handleDrag.bind(this, 'from')}
                min={this.min}
                max={this.max}
                value={this.from}
                type="range"
              />
            </span>
            <span className="label max-min-label max-label">{this.max}</span>
          </p>
        </div>
        <div className="time-slider">
          <span className="label slider-name">to {store.dateTo}</span>
          <p className="time-slider-row">
            <span className="label max-min-label min-label">{this.min}</span>
            <span className="slider-wrapper">
              <input
                className="slider is-medium"
                step="1"
                onChange={this.handleDrag.bind(this, 'to')}
                min={this.min}
                max={this.max}
                value={this.to}
                type="range"
              />
            </span>
            <span className="label max-min-label max-label">{this.max}</span>
          </p>
        </div>
        <div className="field checkbox no-date-checkbox ">
          <input
            className="is-checkradio is-white no-date"
            id="no-date"
            type="checkbox"
            name={'no-date'}
            onChange={store.toggleNoDate}
            checked={store.showNoDate}
          />
          <label htmlFor="no-date">show records with unknown date</label>
        </div>
      </div>
    );
  }
}

export default TimeSlider;
