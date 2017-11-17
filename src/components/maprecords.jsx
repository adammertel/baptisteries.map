import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { divIcon } from 'leaflet';
import { CircleMarker, Marker, Popup, Pane } from 'react-leaflet';

import Shapes from './../helpers/shapes';
import Certainties from './../helpers/certainties';
import TooltipLine from './tooltipline';
import MarkerClusterGroup from 'react-leaflet-markercluster';

require('leaflet.markercluster.placementstrategies');
require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.js');
require('./../../node_modules/leaflet.awesome-markers/dist/leaflet.awesome-markers.css');

@observer
class MapRecords extends React.Component {
  icon(shape) {
    return divIcon({
      html:
        '<span style="vertical-align: bottom" class="marker-icon awesome-marker-icon-cadetblue awesome-marker"><i class="icon-text">' +
        Shapes.getIcon(shape) +
        '</i></span>',
      className: '',
      iconAnchor: [18, 50],
      iconSize: [36, 50]
    });
  }
  render() {
    console.log(store.shapes);
    const records = data.features
      .filter((f, fi) => {
        return (
          f.properties.date < store.date &&
          store.shapes[Shapes.getLabel(f.properties.shape)]
        );
      })
      .map((feature, fi) => {
        const props = feature.properties;
        const icon = this.icon(props.shape);

        return (
          <Marker
            icon={icon}
            key={fi}
            position={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0]
            ]}
          >
            <i>ahoj</i>
            {
              <Popup className="popup">
                <div className="marker-tooltip">
                  <h6 className="title is-6">
                    <strong>{feature.properties.name}</strong>
                  </h6>
                  <TooltipLine
                    definition="Building shape"
                    value={props.shape}
                  />
                  <TooltipLine definition="Date" value={props.date} />
                  <TooltipLine
                    definition="Built after or in"
                    value={props.date_after}
                  />
                  <TooltipLine
                    definition="Built before or in"
                    value={props.date_before}
                  />
                  <TooltipLine
                    definition="Piscina shape"
                    value={props.piscina_shape}
                  />
                  <TooltipLine
                    definition="Piscina depth"
                    value={
                      props.piscina_depth
                        ? props.piscina_depth + ' cm'
                        : 'unknown'
                    }
                  />
                  <TooltipLine
                    definition="Localisation certainty"
                    value={Certainties[props.localisation_certainty]}
                  />
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
            firstCircleElements: 6,
            spiderfyDistanceSurplus: 45,
            animate: false,
            spiderLegPolylineOptions: { weight: 0 },
            clockHelpingCircleOptions: {
              color: 'black',
              dashArray: 5,
              fillOpacity: 0,
              opacity: 0.7,
              weight: 3
            }
          }}
        >
          {records}
        </MarkerClusterGroup>
      </Pane>
    );
  }
}

export default MapRecords;
