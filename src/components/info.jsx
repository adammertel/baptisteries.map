import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import GridLegend from './gridlegend';
@observer
class Panel extends React.Component {
  shouldComponentUpdate(nextProps) {
    return true;
  }

  handleCloseModal() {
    store.closeInfo();
  }

  render() {
    return (
      <div className="modal is-active info">
        <div className="modal-background" />
        <div className="modal-card">
          <section className="modal-card-body">
            <div className="content">
              <p className="has-text-primary title is-4">
                Christian baptisteries - interactive map
              </p>
              <p>
                This interactive map visualizes a database of Christian
                baptisteries built between the 3rd and the 12th century. The
                database is a digital adaptation and formalization of the most
                complete (as of 2017) catalogue of baptisteries by Sebastian
                Ristow (Frühchristliche Baptisterien, Münster: Aschendorffsche
                Verlagsbuchhandlung, 1998) and was compiled by Hana Hořínková in
                the framework of her B.A. thesis at Masaryk University’s
                Department for the Study of Religions (2017), supervised by
                David Zbíral. The map was conceived and created by Adam Mertel
                (Masaryk University, Department of Geography).
              </p>
              <p>
                Of all 1067 buildings in Ristow’s catalogue, this visualization
                takes into account only the buildings whose existence and
                function as baptisteries is considered certain or very probable
                in Ristow’s catalogue and at the same time they were
                successfully localised (778 records, which amounts to 98,1 % of
                certain or very probable baptisteries catalogued by Ristow). The
                localisation has three degrees of certainty:
              </p>
              <ul>
                <li>
                  <strong>precise</strong> when the building is localised to a
                  particular settlement
                </li>
                <li>
                  <strong>approximate</strong> when the particular place or
                  settlement was not found but a nearby settlement was
                </li>
                <li>
                  <strong>ambiguous</strong> when there were more candidates and
                  only one, the most probable, alternative had to be chosen.{' '}
                </li>
              </ul>
              <p>
                The degree of localisation certainty of a particular baptistery
                can be displayed under the individual record by clicking on the
                icon of that particular baptistery, together with some more
                data: modern place name, building shape, terminus post quem
                (“built after or in”), terminus ante quem (“built before or
                in”), the mean value between the terminus post quem and ante
                quem, piscina shape, and piscina depth.
              </p>
              <p>
                When zoomed out, the map shows a hexagonal grid. The shade of an
                individual hexagon denotes the median of the mean values between
                the terminus post quem and ante quem of all baptisteries in that
                hexagon; darker the shade, earlier the date. When zoomed in, the
                map shows icons of individual baptisteries or several aggregated
                baptisteries (in that case, their number is displayed). The
                shape in the icon translates the shape of the building (see the
                Legend).
              </p>
              <p>
                The records displayed can be filtered in two ways: (1)
                (un)checking individual building shapes filters the dataset by
                building shape, and (2) the timeline can be limited in order to
                display only a part of the whole dataset, whose date (based on
                the mean value between the terminus post quem and ante quem)
                falls between 240 and the date selected by the user. Dragging
                the slider or turning the mouse wheel over it allows to move
                through time and see new baptisteries appear; if the map is
                zoomed out, the shade of hexagons changes as well, showing the
                calculated change of the median of the mean dates of
                baptisteries in that hexagon.
              </p>
              <hr />
              <p className="has-text-primary title is-5">Map Legend</p>
              <GridLegend />

              <p className="has-text-centered">
                <a
                  onClick={this.handleCloseModal}
                  className="has-text-centered button is-medium is-primary"
                >
                  Continue...
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Panel;
