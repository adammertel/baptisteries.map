import React from "react";
import { observer } from "mobx-react";
import Shapes from "./../helpers/shapes";

@observer
class ShapeFilter extends React.Component {
  handleChangeFilter(shapeKey) {
    store.toggleShapeFilter(shapeKey);
  }

  handleAllCheckboxClick() {
    store.toggleAllShapeFilters();
  }

  render() {
    return (
      <div className="shape-filter">
        <div className="field checkbox only-label" key="all">
          <input
            className="is-checkradio is-white"
            id="all"
            type="checkbox"
            name="all"
            onChange={this.handleAllCheckboxClick.bind(this)}
            checked={this.props.store.shapesAllChecked}
          />
          <label htmlFor="all">(un)check all</label>
        </div>
        <br />
        {Shapes.shapesDictionary.map(shape => {
          return (
            <div className="field checkbox" key={shape.label}>
              <input
                className="is-checkradio is-white"
                id={shape.label}
                type="checkbox"
                name={shape.label}
                onChange={this.handleChangeFilter.bind(this, shape.label)}
                checked={this.props.store.shapes[shape.label]}
              />
              <label htmlFor={shape.label}>
                <i
                  className={"shape shape-" + shape.label}
                  dangerouslySetInnerHTML={{
                    __html: shape.icon
                  }}
                />
                {shape.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShapeFilter;
