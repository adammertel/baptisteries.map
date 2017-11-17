import React from 'react';
import { observer } from 'mobx-react';

import AppMap from './appmap';
import Panel from './panel';

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
        <AppMap store={store} />
        <Panel store={store} />
      </div>
    );
  }
}
