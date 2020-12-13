import AbstractView from "../abstract-component";
import {createFilmPopupControlsTemplate} from "../film-popup-controls/film-popup-controls-template";

export default class FilmPopupControls extends AbstractView {
  constructor() {
    super();
    this._addToHistoryClickHandler = this._addToHistoryClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmPopupControlsTemplate();
  }

  _addToHistoryClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToHistoryClick();
  }

  setAddToHistoryClickHandler(callback) {
    this._callback.addToHistoryClick = callback;
    this.element.querySelector(`#watchlist`).addEventListener(`click`, this._addToHistoryClickHandler);
  }

  clearAddToHistoryClickHandler() {
    this._callback.addToHistoryClick = null;
    this.element.querySelector(`#watchlist`).removeEventListener(`click`, this._addToHistoryClickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.element.querySelector(`#watched`).addEventListener(`click`, this._addToWatchListClickHandler);
  }

  clearAddToWatchListClickHandler() {
    this._callback.addToWatchListClick = null;
    this.element.querySelector(`#watched`).removeEventListener(`click`, this._addToWatchListClickHandler);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }

  setAddToFavoriteClickHandler(callback) {
    this._callback.addToFavoriteClick = callback;
    this.element.querySelector(`#favorite`).addEventListener(`click`, this._addToFavoriteClickHandler);
  }

  clearAddToFavoriteClickHandler() {
    this._callback.addToFavoriteClick = null;
    this.element.querySelector(`#favorite`).removeEventListener(`click`, this._addToFavoriteClickHandler);
  }
}
