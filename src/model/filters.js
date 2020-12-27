import Observer from "../utils/observer";
import {FilterType} from "../utils/constants";

export default class Filters extends Observer {
  constructor() {
    super();
    this._filter = FilterType.ALL;
  }

  set filter(filterType) {
    this._filter = filterType;
  }

  get filter() {
    return this._filter;
  }
}
