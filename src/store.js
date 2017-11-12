import { observable, action, computed } from 'mobx';
import Base from './base';
import Shapes from './helpers/shapes';

export default class AppStore {
  @observable date = 1300;
  @observable gridThreshold = 7;
  @observable shapeFilter = {};
  @observable basemap = 'CartoDB_Positron';

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

  @computed
  get shapesAllChecked() {
    let allChecked = true;

    Object.keys(this.shapeFilter).map(key => {
      if (!this.shapeFilter[key]) {
        allChecked = false;
      }
    });
    return allChecked;
  }

  @action changeDate = newDate => (this.date = newDate);
  @action
  toggleShapeFilter(shapeKey) {
    this.shapeFilter[shapeKey] = !this.shapeFilter[shapeKey];
  }

  @action
  toggleAllShapeFilters() {
    const checked = this.shapesAllChecked;
    Object.keys(this.shapeFilter).map(key => {
      this.shapeFilter[key] = !checked;
    });
  }
}
