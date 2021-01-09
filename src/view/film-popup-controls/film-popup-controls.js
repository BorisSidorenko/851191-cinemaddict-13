import AbstractView from "../abstract-component";
import {createFilmPopupControlsTemplate} from "../film-popup-controls/film-popup-controls-template";

export default class FilmPopupControls extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._handleControlsClick = this._handleControlsClick.bind(this);
  }

  getTemplate() {
    return createFilmPopupControlsTemplate(this._card.userDetails);
  }

  setClickHandlers(callback) {
    this._callback.popupControlsClick = callback;
    this.element.querySelector(`#watchlist`).addEventListener(`click`, this._handleControlsClick);
    this.element.querySelector(`#watched`).addEventListener(`click`, this._handleControlsClick);
    this.element.querySelector(`#favorite`).addEventListener(`click`, this._handleControlsClick);
  }

  clearClickHandlers() {
    this._callback.popupControlsClick = null;
    this.element.querySelector(`#watchlist`).removeEventListener(`click`, this._handleControlsClick);
    this.element.querySelector(`#watched`).removeEventListener(`click`, this._handleControlsClick);
    this.element.querySelector(`#favorite`).removeEventListener(`click`, this._handleControlsClick);
  }

  _handleControlsClick(evt) {
    evt.preventDefault();
    this._callback.popupControlsClick(evt);
  }
}
