import React, { Component } from 'react';
import { observer } from 'mobx-react';

const handleToggleTodo = todo => {
  store.toggleDone(todo);
};

const Todo = observer(({ todo }) => (
  <div className="field">
    <div className="control">
      <label className="checkbox">
        <input
          type="checkbox"
          onChange={handleToggleTodo.bind(this, todo)}
          checked={todo.done}
        />
        {todo.label}
      </label>
    </div>
  </div>
));

export default Todo;
