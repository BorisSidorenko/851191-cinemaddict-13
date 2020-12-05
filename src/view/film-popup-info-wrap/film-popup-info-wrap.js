import AbstractView from "../abstract-component";
import {createFilmPopupInfoWrapTemplate} from "../film-popup-info-wrap/film-popup-info-wrap-template";

export default class FilmPopupInfoWrap extends AbstractView {
  getTemplate() {
    return createFilmPopupInfoWrapTemplate();
  }
}
