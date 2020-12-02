import {createElement} from "../../utils";
import {createFilmPopupCommentsListTemplate} from "../film-popup-comments-list/film-popup-comments-list-template";

export default class FilmPopupCommentsList {
  constructor(comments) {
    this._element = null;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmPopupCommentsListTemplate(this._comments);
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
