import AbstractView from "../abstract-component";
import {createFilmPopupBottomContainerFormTemplate} from "../film-popup-bottom-container/film-popup-bottom-container-template";

export default class FilmPopupFormBottomContainer extends AbstractView {
  getTemplate() {
    return createFilmPopupBottomContainerFormTemplate();
  }
}
