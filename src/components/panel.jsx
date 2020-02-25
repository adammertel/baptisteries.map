import React from "react";
import { observer } from "mobx-react";

import TimeSlider from "./timeslider";
import MultiSelect from "./multiselect";
import Shapes from "./../helpers/shapes";

@observer
class Panel extends React.Component {
  handleInfoOpen() {
    store.openInfo();
  }

  handleShapeOptionClicked(option) {
    console.log("panel handling option click", option.value);
    store.toggleShapeFilter(option.value);
  }

  handleShapeSelectAll() {
    store.selectAllShapes(true);
  }

  handleShapeUnselectAll() {
    store.selectAllShapes(false);
  }

  render() {
    console.log(store.shapes);
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
          <MultiSelect
            options={Shapes.shapesDictionary.map(shape => {
              return {
                value: shape.label,
                label: shape.label + " " + Shapes.getIcon(shape.label, true),
                inputLabel: Shapes.getIcon(shape.label, true),
                active: store.shapes[shape.label]
              };
            })}
            labelAllSelected={"all shapes selected"}
            labelNothingSelected={"no shapes selected"}
            optionClicked={this.handleShapeOptionClicked}
            selectAll={this.handleShapeSelectAll}
            unselectAll={this.handleShapeUnselectAll}
            longSelectedText={no => no + " shapes selected "}
          />
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
