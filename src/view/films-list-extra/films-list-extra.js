import FilmsListContainerView from "../films-list-container/films-list-container";
import {createFilmsListExtraTemplate} from "./films-list-extra-template";

export default class FilmsListExtra extends FilmsListContainerView {
  constructor(title) {
    super();
    this._title = title;
  }

  get title() {
    return this._title;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._title);
  }
}
