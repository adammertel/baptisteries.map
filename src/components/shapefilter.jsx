import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import Shapes from './../helpers/shapes';

@observer
class ShapeFilter extends React.Component {
  style() {
    return {};
  }

  handleChangeFilter(shapeKey) {
    store.toggleShapeFilter(shapeKey);
  }

  render() {
    return (
      <div className="shape-filter" style={this.style()}>
        {Object.keys(Shapes.shapesDictionary).map(shapeKey => {
          const parsedShape = Shapes.parseShape(shapeKey);
          return (
            <div className="field checkbox" key={shapeKey}>
              <input
                className="is-checkradio is-white is-small"
                id={shapeKey}
                type="checkbox"
                name={shapeKey}
                onChange={this.handleChangeFilter.bind(this, shapeKey)}
                checked={store.shapeFilter[shapeKey]}
              />
              <label htmlFor={shapeKey}>
                <i className={'shape shape-' + parsedShape} />
                {shapeKey}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShapeFilter;
