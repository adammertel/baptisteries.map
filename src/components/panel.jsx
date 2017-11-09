import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import TimeSlider from './timeslider';
import ShapeFilter from './shapefilter';

@observer
class Panel extends React.Component {
  style() {
    return {
      height: 300,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'fixed'
    };
  }

  render() {
    return (
      <div className="panel-wrapper" style={this.style()}>
        <section className="hero is-primary" style={{ height: 300 }}>
          <div className="hero-head" style={{ paddingTop: 10 }}>
            <div className="container">
              <h1 className="title">BAPTISTERIA</h1>
              <h2 className="subtitle">Map application</h2>
            </div>
            <div className="hero-body">
              <TimeSlider />
              <ShapeFilter />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Panel;
