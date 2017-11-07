import React from 'react';
import { observer } from 'mobx-react';

import AppMap from './appmap';
import Panel from './panel';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container is-fluid">
        <AppMap />
        <Panel />
      </div>
    );
  }
}
