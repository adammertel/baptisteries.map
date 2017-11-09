import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import { CircleMarker, Marker, Tooltip, Pane } from 'react-leaflet';

import Shapes from './../helpers/shapes';
import MarkerClusterGroup from 'react-leaflet-markercluster';

require('leaflet.markercluster.placementstrategies');
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
    return Shapes.shapeDictionary[shape]
      ? Shapes.shapeDictionary[shape]
      : Shapes.shapeDictionary['default'];
  };

  componentDidMount() {
    console.log(map.getPane('records'));
  }

  render() {
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'shape';

    const records = data.features
      .filter((f, fi) => {
        return f.properties.date < store.date;
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
      });

    return (
      <Pane style={{ zIndex: 999 }}>
        <MarkerClusterGroup
          options={{
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            removeOutsideVisibleBounds: true,
            elementsPlacementStrategy: 'clock-concentric',
            animate: false,
            spiderLegPolylineOptions: { weight: 0 },
            clockHelpingCircleOptions: { weight: 0 }
          }}
        >
          {records}
        </MarkerClusterGroup>
      </Pane>
    );
  }
}

export default MapRecords;
