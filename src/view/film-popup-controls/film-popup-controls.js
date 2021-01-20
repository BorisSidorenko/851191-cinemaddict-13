import AbstractView from "../abstract-component";
import {createFilmPopupControlsTemplate} from "../film-popup-controls/film-popup-controls-template";

export default class FilmPopupControls extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._controlsClickHandler = this._controlsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmPopupControlsTemplate(this._card.user_details);
  }

  setClickHandlers(callback) {
    this._callback.popupControlsClick = callback;
    this.element.querySelector(`#watchlist`).addEventListener(`click`, this._controlsClickHandler);
    this.element.querySelector(`#watched`).addEventListener(`click`, this._controlsClickHandler);
    this.element.querySelector(`#favorite`).addEventListener(`click`, this._controlsClickHandler);
  }

  _controlsClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupControlsClick(evt);
  }
}
