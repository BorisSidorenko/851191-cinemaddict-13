import {createElement} from "../utils";

const createFilmPopupCommentsWrapTemplate = (commentsCount) => {
  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
  </section>`;
};

export default class FilmPopupCommentsWrap {
  constructor(commentsCount) {
    this._element = null;
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createFilmPopupCommentsWrapTemplate(this._commentsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
