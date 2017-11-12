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
  @observable date = 0;
  @observable shapes = {};
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

  shouldComponentUpdate() {
    return true;
  }

  afterRender() {
    if (
      !this.rendered ||
      this.props.date !== this.date ||
      !Base.compareShapes(store.shapeFilter, this.shapes)
    ) {
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
          scale: 'size',
          range: [
            '#ffffcc',
            '#c7e9b4',
            '#7fcdbb',
            '#41b6c4',
            '#1d91c0',
            '#225ea8',
            '#0c2c84'
          ],
          domain: [200, 1301]
        },
        color: 'white',
        fillOpacity: 0.7,
        opacity: 0,
        weight: 2
      },
      markers: {
        color: '#222222',
        weight: 2,
        fillOpacity: 0.8,
        fillColor: '#255b73',
        radius: {
          method: 'count',
          attribute: '',
          scale: 'continuous',
          range: [2, 15],
          domain: [0, 30]
        }
      },
      texts: {}
    };

    this.grid = L.regularGridCluster({
      rules: rules,
      gridOrigin: { lat: 0, lng: -10 },
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
    this.date = this.props.date;
    this.shapes = Object.assign({}, store.shapeFilter);
  }

  render() {
    return <Pane style={{ zIndex: 999 }} />;
  }
}

export default MapGrid;
