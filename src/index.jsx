import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/app';
import Base from './base';
import './main.scss';
import 'leaflet/dist/leaflet.css';

import Store from './store';

window.store = new Store();
window.map = false;
window.Base = Base;

window.basemaps = Base.requestConfigFile('./basemaps.json', true);

Base.getData('data/baptisteries.geojson', res => {
  window.data = res;
  render(
    <div>
      <DevTools />
      <App />
    </div>,
    document.body.appendChild(document.createElement('div'))
  );
});
