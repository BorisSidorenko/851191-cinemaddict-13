import {createElement} from "../../utils";
import {createFilmPopupNewCommentTemplate} from "../film-popup-new-comment/film-popup-new-comment-template";

export default class FilmPopupNewComment {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupNewCommentTemplate();
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
