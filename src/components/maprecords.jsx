import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import { CircleMarker, Marker, Tooltip, Pane } from 'react-leaflet';
import Shapes from '../helpers/shapes';

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
    const size = 15;

    return (
      <Pane>
        {data.features
          .filter(f => {
            return f.properties.date < store.date;
          })
          .map((feature, fi) => {
            const icon = ReactDOMServer.renderToStaticMarkup(
              Shapes.do(feature.properties.shape, size, {
                stroke: 'white',
                strokeWidth: 2
              })
            );
            return (
              <Marker
                icon={divIcon({
                  html: icon,
                  iconAnchor: [size / 2, size / 2],
                  iconSize: [size, size]
                })}
                key={fi}
                radius={0.5}
                color="black"
                position={[
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
