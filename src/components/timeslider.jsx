import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import IncrementIcon from './incrementicon';

@observer
class TimeSlider extends React.Component {
  @observable min = defaultDates.min;
  @observable max = defaultDates.max;
  @observable from = defaultDates.min;
  @observable to = defaultDates.max;
  @observable changing = false;

  getDateValue = mode => {
    return parseInt(mode === 'from' ? this.from : this.to, 10);
  };

  changeDateValue = (mode, newValue) => {
    if (mode === 'from') {
      if (newValue > this.to) {
        newValue = this.to;
      }
      if (newValue < defaultDates.min) {
        newValue = defaultDates.min;
      }
    } else {
      if (newValue < this.from) {
        newValue = this.from;
      }
      if (newValue > defaultDates.max) {
        newValue = defaultDates.max;
      }
    }
    this[mode] = newValue;
  };

  @action
  handleDrag = (mode, e) => {
    this.changeDateValue(mode, parseInt(e.target.value, 10));
    this.postponeChange(mode);
  };

  postponeChange = (mode, time = 1000) => {
    this.changing = true;
    setTimeout(() => {
      if (this.changing) {
        store.changeDate(this.getDateValue(mode), mode);
        this.changing = false;
      }
    }, time);
  };

  @action
  handleIncrement = (mode, increment = true, by = 1) => {
    const newValue = parseInt(increment ? this[mode] + by : this[mode] - by);
    this.changeDateValue(mode, newValue);
    this.postponeChange(mode, 1);
    Base.clearSelection();
  };

  style() {
    return {};
  }

  render() {
    return (
      <div className="time-slider-wrapper" style={this.style()}>
        <div className="time-slider">
          <span className="label slider-name">
            from
            <IncrementIcon
              icon="angle-double-left"
              handleClick={this.handleIncrement.bind(this, 'from', false, 10)}
            />
            <IncrementIcon
              icon="angle-left"
              handleClick={this.handleIncrement.bind(this, 'from', false, 1)}
            />
            <span className="value-label">{store.dateFrom}</span>
            <IncrementIcon
              icon="angle-right"
              handleClick={this.handleIncrement.bind(this, 'from', true, 1)}
            />
            <IncrementIcon
              icon="angle-double-right"
              handleClick={this.handleIncrement.bind(this, 'from', true, 10)}
            />
          </span>
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
          <span className="label slider-name">
            to
            <IncrementIcon
              icon="angle-double-left"
              handleClick={this.handleIncrement.bind(this, 'to', false, 10)}
            />
            <IncrementIcon
              icon="angle-left"
              handleClick={this.handleIncrement.bind(this, 'to', false, 1)}
            />
            <span className="value-label">{store.dateTo}</span>
            <IncrementIcon
              icon="angle-right"
              handleClick={this.handleIncrement.bind(this, 'to', true, 1)}
            />
            <IncrementIcon
              icon="angle-double-right"
              handleClick={this.handleIncrement.bind(this, 'to', true, 10)}
            />
          </span>
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
