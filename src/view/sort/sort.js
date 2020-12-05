import AbstractView from "../abstract-component";
import {createSortTemplate} from "../sort/sort-template";

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
