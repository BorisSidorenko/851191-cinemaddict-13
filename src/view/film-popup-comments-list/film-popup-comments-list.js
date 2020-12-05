import AbstractView from "../abstract-component";
import {createFilmPopupCommentsListTemplate} from "../film-popup-comments-list/film-popup-comments-list-template";

export default class FilmPopupCommentsList extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createFilmPopupCommentsListTemplate(this._comments);
  }
}
