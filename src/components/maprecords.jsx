import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import { CircleMarker, Tooltip, Pane } from 'react-leaflet';

@observer
class MapRecords extends React.Component {
  @observable newTodoTitle = '';

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleAddTodo = e => {
    store.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
    e.preventDefault();
  };

  render() {
    return (
      <Pane>
        {data.features
          .filter(f => {
            return f.properties.date < store.date;
          })
          .map((feature, fi) => {
            return (
              <CircleMarker
                key={fi}
                radius={0.5}
                color="black"
                center={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0]
                ]}
              />
            );
          })}
      </Pane>
    );
  }
}

export default MapRecords;
