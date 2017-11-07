import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import MapRecords from './maprecords';
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

  style() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'fixed'
    };
  }

  componentDidMount() {
    window['map'] = this.refs.map.leafletElement;
  }

  mapStyle() {
    return {
      position: 'absolute',
      width: '100%',
      top: 0,
      bottom: 300
    };
  }

  render() {
    return (
      <div className="map-wrapped" style={this.style()}>
        <Map
          center={this.mapPosition}
          zoom={this.zoom}
          onViewportChanged={store.mapMoved}
          useFlyTo={true}
          ref="map"
          style={this.mapStyle()}
          attributionControl={false}
          maxZoom={12}
          minZoom={3}
        >
          <ScaleControl position="topleft" imperial={false} />
          <AttributionControl position="bottomleft" />

          <LayersControl position="topright">
            <LayersControl.BaseLayer
              checked={true}
              name="OpenStreetMap.BlackAndWhite"
            >
              <TileLayer
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
              <TileLayer
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <MapRecords />
        </Map>
      </div>
    );
  }
}

export default AppMap;
