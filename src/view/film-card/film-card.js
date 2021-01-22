import AbstractView from "../abstract-component";
import {createFilmCardTemplate} from "../film-card/film-card-template";
import {CardControls} from "../../utils/constants";

export default class FilmCard extends AbstractView {
  constructor(card, commentsCount) {
    super();
    this._card = card;
    this._commentsCount = commentsCount;
    this._controlsClickHandler = this._controlsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _controlsClickHandler(evt) {
    evt.preventDefault();
    this._callback.controlsClick(evt);
  }

  setControlsClickHandler(callback) {
    this._callback.controlsClick = callback;
    this.element.querySelector(`.${CardControls.WATCHED}`).addEventListener(`click`, this._controlsClickHandler);
    this.element.querySelector(`.${CardControls.WATCHLIST}`).addEventListener(`click`, this._controlsClickHandler);
    this.element.querySelector(`.${CardControls.FAVORITE}`).addEventListener(`click`, this._controlsClickHandler);
  }
}
