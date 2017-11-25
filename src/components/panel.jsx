import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import TimeSlider from './timeslider';
import ShapeFilter from './shapefilter';

@observer
class Panel extends React.Component {
  shouldComponentUpdate(nextProps) {
    return true;
  }

  handleInfoOpen() {
    store.openInfo();
  }

  render() {
    return (
      <div className="panel-wrapper">
        <h1 className="title">Christian Baptisteries</h1>
        <h2 className="subtitle">
          Showing {store.activeRecordsCount} / {store.recordsCountAll} records
        </h2>
        <p />
        <h3 className="subtitle section-label">Temporal filter</h3>
        <div className="panel-control">
          <TimeSlider />
        </div>
        <hr />
        <h3 className="subtitle section-label">Building shape</h3>
        <div className="panel-control">
          <ShapeFilter store={store} />
        </div>
        <hr />
        <a className="button is-white" onClick={this.handleInfoOpen.bind(this)}>
          info
        </a>
      </div>
    );
  }
}

export default Panel;
