import { observable, action, computed } from 'mobx';
import Base from './base';
import Shapes from './helpers/shapes';

export default class AppStore {
  @observable date = 1300;
  @observable shapeFilter = {};

  constructor() {
    this.shapeFilter = Object.assign({}, Shapes.shapesDictionary);
    Object.keys(this.shapeFilter).map(shapeKey => {
      this.shapeFilter[shapeKey] = true;
    });
  }

  @computed
  get todosArray() {
    return Base.sortAlphabetical(this.todos, 'label');
  }

  @action changeDate = newDate => (this.date = newDate);
  @action
  toggleShapeFilter(shapeKey) {
    this.shapeFilter[shapeKey] = !this.shapeFilter[shapeKey];
  }
}
