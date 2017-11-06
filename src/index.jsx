import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';
import App from './components/app';
import './main.scss';

import Store from './store';

window.store = new Store();
store.addTodo('make coffee');
store.addTodo('get a cookie');
store.addTodo('drink coffee');

render(
  <div className="section">
    <DevTools />
    <App />
  </div>,
  document.body.appendChild(document.createElement('div'))
);
