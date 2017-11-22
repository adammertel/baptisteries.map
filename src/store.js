import { observable, action, computed, extendObservable } from 'mobx';
import Base from './base';
import Shapes from './helpers/shapes';

export default class AppStore {
  @observable date = 1200;
  @observable gridThreshold = 6;
  @observable shapes = {};
  @observable infoOpen = true;
  @observable basemap = 'CartoDB_Positron';

  constructor() {
    Shapes.shapesDictionary.map(s => s.label).map(label => {
      const newRule = {};
      newRule[label] = true;
      extendObservable(this.shapes, newRule);
    });
    console.log(this.shapes);
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

  displayMapGrid() {
    if (map.getZoom) {
      return map.getZoom() <= store.gridThreshold;
    } else {
      return true;
    }
  }

  @action closeInfo = () => (this.infoOpen = false);
  @action openInfo = () => (this.infoOpen = true);

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
