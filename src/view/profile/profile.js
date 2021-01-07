import AbstractView from "../abstract-component";
import {createProfileTemplate} from "../profile/profile-template";

export default class Profile extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }
}
