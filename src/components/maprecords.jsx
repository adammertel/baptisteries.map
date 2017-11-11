import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import { CircleMarker, Marker, Popup, Pane } from 'react-leaflet';

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

  componentDidMount() {
    console.log(map.getPane('records'));
  }

  render() {
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'shape';

    const records = data.features
      .filter((f, fi) => {
        return (
          f.properties.date < store.date &&
          store.shapeFilter[f.properties.shape]
        );
      })
      .map((feature, fi) => {
        const props = feature.properties;
        const icon = L.AwesomeMarkers.icon({
          icon: Shapes.parseShape(props.shape),
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
          >
            {
              <Popup>
                <div className="marker-tooltip">
                  <h6 className="title is-6">
                    <strong>{feature.properties.name}</strong>
                  </h6>
                  <p className="line">
                    <span className="definition">date:</span>
                    <span className="value">{props.date}</span>
                  </p>
                  <p className="line">
                    <span className="definition">building shape:</span>
                    <span className="value">{props.shape}</span>
                  </p>
                  <p className="line">
                    <span className="definition">specification:</span>
                    <span className="value">{props.specification}</span>
                  </p>
                </div>
              </Popup>
            }
          </Marker>
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
