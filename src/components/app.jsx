import React from 'react';
import { observer } from 'mobx-react';

import Base from './../base';
import TodoList from './todolist';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container is-fluid">
        {Base.label()}
        <TodoList />
      </div>
    );
  }
}
