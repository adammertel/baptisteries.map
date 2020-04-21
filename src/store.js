import { observable, action, computed, extendObservable } from "mobx";
import Base from "./base";
import Shapes from "./helpers/shapes";

export default class AppStore {
  @observable
  dateFrom = defaultDates.min;

  @observable
  dateTo = defaultDates.max;

  @observable
  showNoDate = true;

  @observable
  gridThreshold = 6;

  @observable
  shapes = {};

  @observable
  infoOpen = !DEV && true;

  @observable
  basemap = "CartoDB_Positron";

  constructor() {
    Shapes.shapesDictionary
      .map((s) => s.label)
      .map((label) => {
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
    return Base.sortAlphabetical(this.todos, "label");
  }

  @computed
  get activeRecordsCount() {
    return (
      data &&
      data.features &&
      data.features.length &&
      data.features.filter((f) => store.isActiveRecord(f)).length
    );
  }

  @computed
  get recordsCountAll() {
    return data.features ? data.features.length : 0;
  }

  displayMapGrid() {
    if (map.getZoom) {
      return map.getZoom() <= store.gridThreshold;
    } else {
      return true;
    }
  }

  @action
  toggleNoDate = () => (this.showNoDate = !this.showNoDate);

  @action
  closeInfo = () => (this.infoOpen = false);

  @action
  openInfo = () => (this.infoOpen = true);

  @action
  changeDate = (newDate, mode) => {
    if (mode === "from") {
      this.dateFrom = newDate;
    } else if (mode === "to") {
      this.dateTo = newDate;
    }
  };

  @action
  toggleShapeFilter(shapeKey) {
    this.shapes[shapeKey] = !this.shapes[shapeKey];
  }

  @action
  selectAllShapes(select) {
    Object.keys(this.shapes).forEach((key) => {
      this.shapes[key] = select;
    });
  }
}
