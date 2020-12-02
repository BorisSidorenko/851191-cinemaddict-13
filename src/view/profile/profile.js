import {createElement} from "../../utils";
import {createProfileTemplate} from "../profile/profile-template";

export default class Profile {
  constructor(filmsCount) {
    this._element = null;
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsCount);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
