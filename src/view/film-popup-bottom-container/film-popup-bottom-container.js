import AbstractView from "../abstract-component";
import {createFilmPopupBottomContainerFormTemplate} from "../film-popup-bottom-container/film-popup-bottom-container-template";

export default class FilmPopupForm extends AbstractView {
  getTemplate() {
    return createFilmPopupBottomContainerFormTemplate();
  }
}
