import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/app';
import Base from './base';
import Shapes from './helpers/shapes';
import './main.scss';
import 'leaflet/dist/leaflet.css';

import Store from './store';

window.defaultDates = {
  min: 230,
  max: 1200
};

window.store = new Store();
window.map = false;
window.Base = Base;

window.basemaps = Base.requestConfigFile('./basemaps.json', true);

// grid global settings
window.gridCellColors = [
  '#ffffe5',
  '#ffffe5',
  '#fff7bc',
  '#fee391',
  '#fec44f',
  '#fe9929',
  '#ec7014',
  '#cc4c02',
  '#993404',
  '#662506',
  '#662506'
];

gridCellColors.reverse();
window.gridCellDomain = [230, 1201];

window.DEVELOPMENT = process.env.NODE_ENV === 'development';

Base.getData('data/baptisteries.geojson', res => {
  window.data = res;
  render(
    <div>
      {DEVELOPMENT && <DevTools />}
      <App store={store} />
    </div>,
    document.body.appendChild(document.createElement('div'))
  );
});
