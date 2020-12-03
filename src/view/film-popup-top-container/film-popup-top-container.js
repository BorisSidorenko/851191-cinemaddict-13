import AbstractView from "../abstract-component";
import {createFilmPopupTopContainerFormTemplate} from "../film-popup-top-container/film-popup-top-container-template";

export default class FilmPopupTopContainer extends AbstractView {
  getTemplate() {
    return createFilmPopupTopContainerFormTemplate();
  }
}
