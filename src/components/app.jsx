import React from 'react';
import { observer } from 'mobx-react';

import AppMap from './appmap';
import Panel from './panel';
import Info from './info';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div className="container is-fluid">
        {store.infoOpen && <Info store={store} />}
        <AppMap store={store} />
        <Panel store={store} />
      </div>
    );
  }
}
