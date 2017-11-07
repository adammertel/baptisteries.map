import { observable, action, computed } from 'mobx';
import Base from './base.js';

export default class AppStore {
  @observable date = 1000;

  constructor() {}

  @computed
  get todosArray() {
    return Base.sortAlphabetical(this.todos, 'label');
  }

  @action changeDate = newDate => (this.date = newDate);
}
