import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import MapRecords from './maprecords';
import MapGrid from './mapgrid';

require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.js');
require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css');

import {
  Map,
  TileLayer,
  WMSTileLayer,
  ScaleControl,
  AttributionControl,
  LayersControl,
  CircleMarker,
  Tooltip,
  Marker,
  LayerGroup,
  GeoJSON,
  Pane
} from 'react-leaflet';
import 'leaflet-regular-grid-cluster';

@observer
class AppMap extends React.Component {
  @observable center = [40, 20];
  @observable zoom = 5;

  @action
  handleViewportChanged = e => {
    this.center = e.center;
    this.zoom = e.zoom;
  };

  @computed
  get mapPosition() {
    return [this.center[0], this.center[1]];
  }

  componentDidMount() {
    window['map'] = this.refs.map.leafletElement;
    L.Util.setOptions(map, { maxBoundsViscosity: 1 });
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }

  renderBaseLayers() {
    return <LayerGroup>{this.renderBaseLayer()}</LayerGroup>;
  }

  renderBaseLayer(basemap) {
    if (basemap.type === 'tile') {
      return <TileLayer {...basemap} />;
    } else if (basemap.type === 'wms') {
      return <WMSTileLayer {...basemap} />;
    }
  }

  render() {
    return (
      <div className="map-wrapper">
        <Map
          center={this.mapPosition}
          zoom={this.zoom}
          onViewportChanged={this.handleViewportChanged}
          useFlyTo={true}
          ref="map"
          attributionControl={false}
          attributionControl={false}
          maxZoom={10}
          minZoom={5}
        >
          <ScaleControl position="topleft" imperial={false} />
          <AttributionControl position="bottomleft" />

          <LayersControl position="topright">
            {Object.keys(basemaps).map(basemapId => {
              const basemap = basemaps[basemapId];
              return (
                <LayersControl.BaseLayer
                  checked={store.basemap === basemapId}
                  name={basemap.name}
                  key={basemapId}
                >
                  {this.renderBaseLayer(basemap)}
                </LayersControl.BaseLayer>
              );
            })}
          </LayersControl>
          {store.displayMapGrid() ? (
            <MapGrid
              map={map}
              dateTo={this.props.store.dateTo}
              dateFrom={this.props.store.dateFrom}
              shapes={this.props.store.shapes}
            />
          ) : (
            <MapRecords />
          )}
        </Map>
      </div>
    );
  }
}

export default AppMap;
