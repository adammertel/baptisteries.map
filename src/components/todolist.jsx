import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import Todo from './todo';

@observer
class TodoList extends React.Component {
  @observable newTodoTitle = '';

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleAddTodo = e => {
    store.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Add new task"
              value={this.newTodoTitle}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="control">
            <a className="button is-primary" onClick={this.handleAddTodo}>
              Add
            </a>
          </div>
        </div>
        <hr />
        <ul>
          {store.todosArray.map(todo => <Todo todo={todo} key={todo.id} />)}
        </ul>
        Tasks left: {store.unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoList;
