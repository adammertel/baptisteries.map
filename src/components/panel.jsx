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

  render() {
    return (
      <div className="panel-wrapper">
        <h1 className="title">Christian Baptisteries</h1>
        <h3 className="subtitle section-label">
          Temporal filter: <strong>{store.date}</strong>
        </h3>
        <div className="panel-control">
          <TimeSlider />
        </div>
        <h3 className="subtitle section-label">The shape of the buildings:</h3>
        <div className="panel-control">
          <ShapeFilter store={store} />
        </div>
      </div>
    );
  }
}

export default Panel;
