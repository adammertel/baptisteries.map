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
        <p />
        <h3 className="subtitle section-label">
          Temporal filter: <strong>{store.date}</strong>
        </h3>
        <div className="panel-control">
          <TimeSlider />
        </div>
        <hr />
        <h3 className="subtitle section-label">The shape of the buildings:</h3>
        <div className="panel-control">
          <ShapeFilter store={store} />
        </div>
        <hr />
        <a className="button is-white">open info</a>
      </div>
    );
  }
}

export default Panel;
