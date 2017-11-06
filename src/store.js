import { observable, action, computed } from 'mobx';
import Base from './base.js';

export default class AppStore {
  @observable todos = [];
  @observable lastId = 0;

  constructor() {}

  @computed
  get todosArray() {
    return Base.sortAlphabetical(this.todos, 'label');
  }
  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(t => !t.done).length;
  }

  @action
  addTodo(label, done = false) {
    this.lastId += 1;
    this.todos.push({ label: label, done: done, id: this.lastId });
  }

  @action
  toggleDone(toggledTodo) {
    toggledTodo.done = !toggledTodo.done;
  }
}
