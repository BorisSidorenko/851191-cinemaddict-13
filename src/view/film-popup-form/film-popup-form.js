import AbstractView from "../abstract-component";
import {createFilmPopupFormTemplate} from "../film-popup-form/film-popup-form-template";

export default class FilmPopupForm extends AbstractView {
  getTemplate() {
    return createFilmPopupFormTemplate();
  }
}
