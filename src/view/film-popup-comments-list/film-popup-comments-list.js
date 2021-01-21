import AbstractView from "../abstract-component";
import {createFilmPopupCommentsListTemplate} from "../film-popup-comments-list/film-popup-comments-list-template";

export default class FilmPopupCommentsList extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmPopupCommentsListTemplate(this._comments);
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteComment(evt);
  }

  setDeleteButtonHandlers(callback) {
    this._callback.deleteComment = callback;
    this.element.addEventListener(`click`, this._deleteButtonClickHandler);
  }
}
