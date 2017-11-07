import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/app';
import Base from './base';
import './main.scss';
import 'leaflet/dist/leaflet.css';

import Store from './store';

window.store = new Store();
window.Base = Base;

Base.getData('data/baptisteries.geojson', res => {
  console.log('data', res);
});

render(
  <div className="section">
    <DevTools />
    <App />
  </div>,
  document.body.appendChild(document.createElement('div'))
);
