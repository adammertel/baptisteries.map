import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import TimeSlider from './timeslider';
import ShapeFilter from './shapefilter';

@observer
class Panel extends React.Component {
  render() {
    return (
      <div className="panel-wrapper">
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">BAPTISTERIA Interactive Map</h1>
              <h3 className="subtitle">Show only buildings built before:</h3>
              <div className="panel-control">
                <TimeSlider />
              </div>
              <h3 className="subtitle">Filter buildings based on the shape:</h3>
              <div className="panel-control">
                <ShapeFilter />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Panel;
