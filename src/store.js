import { observable, action, computed } from 'mobx';
import Base from './base';
import Shapes from './helpers/shapes';

export default class AppStore {
  @observable date = 1200;
  @observable gridThreshold = 6;
  @observable shapes = {};
  @observable basemap = 'CartoDB_Positron';

  constructor() {
    const initShapes = {};
    Shapes.shapesDictionary.map(s => s.label).map(l => (initShapes[l] = true));

    this.shapes = Object.assign({}, initShapes);
  }

  @computed
  get todosArray() {
    return Base.sortAlphabetical(this.todos, 'label');
  }

  @computed
  get shapesAllChecked() {
    let allChecked = true;

    Object.keys(this.shapes).map(key => {
      if (!this.shapes[key]) {
        allChecked = false;
      }
    });
    return allChecked;
  }

  @action changeDate = newDate => (this.date = newDate);
  @action
  toggleShapeFilter(shapeKey) {
    this.shapes[shapeKey] = !this.shapes[shapeKey];
  }

  @action
  toggleAllShapeFilters() {
    const checked = this.shapesAllChecked;
    Object.keys(this.shapes).map(key => {
      this.shapes[key] = !checked;
    });
  }
}
