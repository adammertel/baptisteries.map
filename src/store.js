import { observable, action, computed, extendObservable } from 'mobx';
import Base from './base';
import Shapes from './helpers/shapes';

export default class AppStore {
  @observable dateFrom = defaultDates.min;
  @observable dateTo = defaultDates.max;
  @observable showNoDate = true;
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
  }

  isDateGood(f) {
    if (this.showNoDate && !f.properties.date) {
      return true;
    } else {
      return (
        f.properties.date &&
        f.properties.date <= store.dateTo &&
        f.properties.date >= store.dateFrom
      );
    }
  }

  isActiveRecord(f) {
    return (
      store.isDateGood(f) && store.shapes[Shapes.getLabel(f.properties.shape)]
    );
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
  @computed
  get activeRecordsCount() {
    return data.features.filter(f => store.isActiveRecord(f)).length;
  }

  @computed
  get recordsCountAll() {
    return data.features.length;
  }

  displayMapGrid() {
    if (map.getZoom) {
      return map.getZoom() <= store.gridThreshold;
    } else {
      return true;
    }
  }

  @action toggleNoDate = () => (this.showNoDate = !this.showNoDate);
  @action closeInfo = () => (this.infoOpen = false);
  @action openInfo = () => (this.infoOpen = true);

  @action
  changeDate = (newDate, mode) => {
    if (mode === 'from') {
      this.dateFrom = newDate;
    } else if (mode === 'to') {
      this.dateTo = newDate;
    }
  };
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
