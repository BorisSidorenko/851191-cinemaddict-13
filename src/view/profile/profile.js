import AbstractView from "../abstract-component";
import {createProfileTemplate} from "../profile/profile-template";

export default class Profile extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsCount);
  }
}
