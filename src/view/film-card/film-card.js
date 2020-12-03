import AbstractView from "../abstract-component";
import {createFilmCardTemplate} from "../film-card/film-card-template";

export default class FilmCard extends AbstractView {
  constructor(card, commentsCount) {
    super();
    this._card = card;
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card, this._commentsCount);
  }
}
