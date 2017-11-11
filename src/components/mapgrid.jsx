import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import L from 'leaflet';
import Shapes from './../helpers/shapes';
import { Pane } from 'react-leaflet';

require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.js');
require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css');

@observer
class MapGrid extends React.Component {
  @observable rendered = false;
  grid = false;

  @action
  toggleRender = e => {
    this.rendere = !this.rendered;
  };

  componentDidMount() {
    this.afterRender();
  }

  componentDidUpdate() {
    this.afterRender();
  }

  componentWillUnmount() {
    this.rendered = false;
    this.clearGrid();
  }

  afterRender() {
    if (!this.rendered) {
      this.renderGrid();
    }
  }

  clearGrid() {
    if (this.grid) {
      if (this.grid.unregister) {
        try {
          this.grid.unregister();
        } catch (e) {
          console.log(e);
        }
      }
      this.grid.clearLayers();

      map.removeLayer(this.grid);
    }
  }

  renderGrid() {
    this.clearGrid();
    const rules = {
      cells: {
        fillColor: {
          method: 'mean',
          attribute: 'date',
          scale: 'continuous',
          range: [
            '#ffffb2',
            '#fed976',
            '#feb24c',
            '#fd8d3c',
            '#f03b20',
            '#bd0026'
          ]
        },
        color: 'black',
        fillOpacity: 0.5,
        weight: 0
      },
      markers: {
        color: '#222222',
        weight: 2,
        fillOpacity: 0.9,
        fillColor: '#255b73',
        radius: {
          method: 'count',
          attribute: '',
          scale: 'continuous',
          range: [7, 17]
        }
      },
      texts: {}
    };

    this.grid = L.regularGridCluster({
      rules: rules,
      gridMode: 'hexagon',
      showCells: true,
      showMarkers: true,
      showTexts: false
    });

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
        return {
          marker: L.marker([
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          ]),
          properties: feature.properties
        };
      });
    this.grid.addLayers(records);
    this.grid.addTo(map);

    this.rendered = true;
  }

  render() {
    return <Pane style={{ zIndex: 999 }} />;
  }
}

export default MapGrid;
