import {createElement} from "../../utils";
import {createFilmCardTemplate} from "../film-card/film-card-template";

export default class FilmCard {
  constructor(card, commentsCount) {
    this._element = null;
    this._card = card;
    this._commentsCount = commentsCount;
  }

  getTemaplate() {
    return createFilmCardTemplate(this._card, this._commentsCount);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.getTemaplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
