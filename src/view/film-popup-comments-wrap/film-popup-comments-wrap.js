import {createElement} from "../../utils";
import {createFilmPopupCommentsWrapTemplate} from "../film-popup-comments-wrap/film-popup-comments-wrap-template";

export default class FilmPopupCommentsWrap {
  constructor(commentsCount) {
    this._element = null;
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createFilmPopupCommentsWrapTemplate(this._commentsCount);
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
