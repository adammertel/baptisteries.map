import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Shapes from "./../helpers/shapes";
import { Pane } from "react-leaflet";

@observer
class MapGrid extends React.Component {
  @observable rendered = false;
  @observable dateFrom = 0;
  @observable dateTo = 0;
  @observable showNoDate = true;
  @observable shapes = {};
  grid = false;

  @action
  toggleRender = (e) => {
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
    if (
      data.features &&
      (!this.rendered ||
        this.props.dateTo !== this.dateTo ||
        this.props.showNoDate !== this.showNoDate ||
        this.props.dateFrom !== this.dateFrom ||
        !Base.compareShapes(this.props.shapes, this.shapes))
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
          method: "mean",
          attribute: "date",
          scale: "size",
          range: window.gridCellColors,
          domain: window.gridCellDomain,
        },
        color: "#222222",
        fillOpacity: 0.6,
        opacity: 1,
        weight: 2,
      },
      markers: {
        color: "#222222",
        weight: 0,
        fillOpacity: 0.9,
        fillColor: "#222222",
        radius: {
          method: "count",
          attribute: "",
          scale: "continuous",
          range: [1, 22],
          domain: [0, 50],
        },
      },
      texts: {},
    };

    this.grid = L.regularGridCluster({
      rules: rules,
      gridOrigin: { lat: 0, lng: -12 },
      gridMode: "hexagon",
      showCells: true,
      showMarkers: true,
      showTexts: false,
      zoneSize: 6000,
      defaultStyle: {
        cells: {
          fillColor: "#383838",
        },
      },
    });

    const records = data.features
      .filter(store.isActiveRecord)
      .map((feature, fi) => {
        return {
          marker: L.marker([
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]),
          properties: feature.properties,
        };
      });
    this.grid.addLayers(records);
    this.grid.addTo(map);

    this.rendered = true;
    this.dateFrom = this.props.dateFrom;
    this.showNoDate = this.props.showNoDate;
    this.dateTo = this.props.dateTo;
    this.shapes = Object.assign({}, store.shapes);
  }

  render() {
    return (
      <Pane
        style={{ zIndex: 999 }}
        activeShapes={
          Object.keys(store.shapes).filter((s) => store.shapes[s]).length
        }
      />
    );
  }
}

export default MapGrid;
