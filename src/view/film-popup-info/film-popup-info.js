import AbstractView from "../abstract-component";
import {createFilmPopupInfoTemplate} from "../film-popup-info/film-popup-info-template";

export default class FilmPopupInfo extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmPopupInfoTemplate(this._card);
  }
}
