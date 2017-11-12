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

  handleAllCheckboxClick() {
    store.toggleAllShapeFilters();
  }

  render() {
    return (
      <div className="shape-filter" style={this.style()}>
        <div className="field checkbox only-label" key="all">
          <input
            className="is-checkradio is-white"
            id="all"
            type="checkbox"
            name="all"
            onChange={this.handleAllCheckboxClick.bind(this)}
            checked={store.shapesAllChecked}
          />
          <label htmlFor="all">(un)check all</label>
        </div>
        <br />
        {Object.keys(Shapes.shapesDictionary).map(shapeKey => {
          const parsedShape = Shapes.parseShape(shapeKey);
          return (
            <div className="field checkbox" key={shapeKey}>
              <input
                className="is-checkradio is-white"
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
