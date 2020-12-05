import AbstractView from "../abstract-component";
import {createFilmPopupTemplate} from "../film-popup/film-popup-template";

export default class FilmPopup extends AbstractView {
  getTemplate() {
    return createFilmPopupTemplate();
  }
}
