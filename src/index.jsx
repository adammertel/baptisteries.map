import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/app';
import Base from './base';
import Shapes from './helpers/shapes';
import './main.scss';
import 'leaflet/dist/leaflet.css';

import Store from './store';

window.store = new Store();
window.map = false;
window.Base = Base;

window.basemaps = Base.requestConfigFile('./basemaps.json', true);

Shapes.shapesDictionary.map(shape => {
  //console.log('.shape-' + shape.label + ':before', 'content:' + shape.icon);
  Base.createCSSSelector(
    '.shape-' + shape.label + ':before',
    'content:' + shape.icon
  );
});

Base.getData('data/baptisteries.geojson', res => {
  window.data = res;
  render(
    <div>
      <DevTools />
      <App store={store} />
    </div>,
    document.body.appendChild(document.createElement('div'))
  );
});
