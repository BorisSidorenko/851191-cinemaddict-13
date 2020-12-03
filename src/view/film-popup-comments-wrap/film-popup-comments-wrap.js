import AbstractView from "../abstract-component";
import {createFilmPopupCommentsWrapTemplate} from "../film-popup-comments-wrap/film-popup-comments-wrap-template";

export default class FilmPopupCommentsWrap extends AbstractView {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createFilmPopupCommentsWrapTemplate(this._commentsCount);
  }
}
