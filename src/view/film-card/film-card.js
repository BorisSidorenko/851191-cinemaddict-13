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
    return createFilmCardTemplate(this._card, this._commentsCount);
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

  clearControlsClickHandler() {
    this._callback.controlsClick = null;
    this.element.querySelector(`.${CardControls.WATCHED}`).removeEventListener(`click`, this._controlsClickHandler);
    this.element.querySelector(`.${CardControls.WATCHLIST}`).removeEventListener(`click`, this._controlsClickHandler);
    this.element.querySelector(`.${CardControls.FAVORITE}`).removeEventListener(`click`, this._controlsClickHandler);
  }
}
