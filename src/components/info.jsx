import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

import GridLegend from './gridlegend'
@observer class Panel extends React.Component {
  shouldComponentUpdate (nextProps) {
    return true
  }

  handleCloseModal () {
    store.closeInfo()
  }

  render () {
    const version = '1.0.2'
    return (
      <div className='modal is-active info'>
        <div className='modal-background' />
        <div className='modal-card'>
          <section className='modal-card-body'>
            <div className='content'>
              <p className='has-text-primary title is-4'>
                Christian baptisteries: interactive map (version {version})
                <button onClick={this.handleCloseModal} className="delete is-medium is-pulled-right" aria-label="close"></button>
              </p>
              <p>
                This interactive map visualizes a database of Christian
                baptisteries built between the 3rd and 12th centuries. The
                database is a digital adaptation and formalization of the most
                complete (as of 2017) catalogue of baptisteries by Sebastian
                Ristow (<i>Frühchristliche Baptisterien</i>, Münster:
                Aschendorffsche Verlagsbuchhandlung, 1998) and was compiled by
                Hana Hořínková in the framework of her{' '}
                <a href='http://is.muni.cz/th/439223/ff_b/?lang=en'>
                  B.A. thesis
                </a>{' '}
                at Masaryk University’s Department for the Study of Religions
                (2017), supervised by
                <a href='http://www.david-zbiral.cz/'>
                  {' '}David Zbíral
                </a>
                . The map
                was conceived and created by{' '}
                <a href='https://github.com/adammertel'>
                  Adam Mertel
                </a>
                {' '}
                (Masaryk
                University, Department of Geography).
              </p>
              <p>
                Of all 1067 buildings in Ristow’s catalogue, this visualization
                takes into account only those whose existence and function as
                baptisteries is considered certain or very probable and which,
                at the same time, were successfully localised (778 records,
                which amounts to 98.1 % of all certain or very probable
                baptisteries catalogued by Ristow). The localisation has three
                degrees of certainty:
              </p>
              <ul>
                <li>
                  <strong>precise</strong>
                  {' '}
                  when the building is localised to a
                  particular settlement
                </li>
                <li>
                  <strong>approximate</strong> when the particular
                  settlement was not found but a nearby settlement was
                </li>
                <li>
                  <strong>ambiguous</strong>
                  {' '}
                  when there were more candidates and
                  only one, the most probable, alternative had to be chosen.
                  {' '}
                </li>
              </ul>
              <p>
                The degree of certainty of the localisation of a particular
                baptistery can be displayed under the individual record by
                clicking on the icon of that particular baptistery. This appears
                with some further data: modern place name, building shape,
                {' '}
                <i>terminus post quem </i>
                (“built after or in”),
                {' '}
                <i>terminus ante quem</i>
                {' '}
                (“built before
                or in”), the mean value between the
                {' '}
                <i>terminus post quem</i>
                {' '}
                and
                {' '}
                <i>ante quem</i>
                , piscina shape, and piscina depth.
              </p>
              <p>
                When zoomed out, the map shows a hexagonal grid. The shade of an
                individual hexagon denotes the median of the mean values between
                the
                {' '}
                <i>terminus post quem</i>
                {' '}
                and
                {' '}
                <i>ante quem</i>
                {' '}
                of all
                baptisteries in that hexagon; the darker the shade, the earlier
                the date. When zoomed in, the map shows icons of individual
                baptisteries or several aggregated baptisteries (in the latter
                case, their number is displayed). The shape in the icon
                translates to the shape of the building (see the legend below).
              </p>
              <p>
                The records displayed can be filtered in two ways:
              </p>
              <ul>
                <li>
                  (un)checking individual building shapes filters the dataset by
                  building shape
                </li>
                <li>
                  the timeline can be limited in order to display only a part of
                  the whole dataset whose dates (based on the mean values between
                  the
                  {' '}
                  <i>terminus post quem</i>
                  {' '}
                  and
                  {' '}
                  <i>ante quem</i>
                  ) fall
                  between the dates selected by the user. Dragging the slider,
                  or turning the mouse wheel over it allows the user to move
                  through time and see new baptisteries appear.
                </li>
              </ul>
              <p>
                When zooming out to the level of hexagons and moving the slider,
                the shade of the hexagons also changes, showing the change in
                the calculated median of the mean dates of baptisteries in that
                hexagon.
              </p>
              <p>
                The base map can be selected under the icon in the upper right
                corner.
              </p>

              <hr />
              <p className='has-text-primary title is-5'>
                Recommended citation
              </p>
              <p>
                RISTOW, S., A. MERTEL, H. HOŘÍNKOVÁ, D. ZBÍRAL (2017). Christian baptisteries: interactive map (version {version}). Available online at &lt;http://hde.geogr.muni.cz/baptisteries&gt;.
              </p>
              <hr />
              <p className='has-text-primary title is-5'>
                Map Legend
              </p>
              <GridLegend />

              <p className='has-text-centered'>
                <a
                  onClick={this.handleCloseModal}
                  className='has-text-centered button is-medium is-primary'
                >
                  Continue...
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Panel
