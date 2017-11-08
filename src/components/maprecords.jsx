import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import { CircleMarker, Marker, Tooltip, Pane } from 'react-leaflet';
import Shapes from '../helpers/shapes';
require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.js');
require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css');

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

  parseShape = shape => {
    const shapeDictionary = {
      default: 'foil',
      rectangle: 'rectangle',
      square: 'square',
      round: 'circle',
      semicircle: 'circle',
      'inside the church': 'inside',
      'central building': 'inside',
      polygon: 'trapezoid',
      cross: 'cross',
      trefoil: 'foil',
      quatrefoil: 'foil',
      octofoil: 'foil',
      trapezoid: 'trapezoid',
      hexagon: 'hexagon',
      octogon: 'trapezoid'
    };
    return shapeDictionary[shape]
      ? shapeDictionary[shape]
      : shapeDictionary['default'];
  };

  render() {
    const size = 20;
    console.log('renders');
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'shape';
    return (
      <Pane>
        {data.features
          .filter((f, fi) => {
            return f.properties.date < store.date && fi < 100;
          })
          .map((feature, fi) => {
            const icon = L.AwesomeMarkers.icon({
              icon: this.parseShape(feature.properties.shape),
              markerColor: 'cadetblue',
              shadowSize: [0, 0]
            });
            return (
              <Marker
                icon={icon}
                key={fi}
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
