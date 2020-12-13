import AbstractView from "../abstract-component";
import {createFilmCardTemplate} from "../film-card/film-card-template";

export default class FilmCard extends AbstractView {
  constructor(card, commentsCount) {
    super();
    this._card = card;
    this._commentsCount = commentsCount;
    this._addToHistoryClickHandler = this._addToHistoryClickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card, this._commentsCount);
  }

  _addToHistoryClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToHistoryClick();
  }

  setAddToHistoryClickHandler(callback) {
    this._callback.addToHistoryClick = callback;
    this.element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._addToHistoryClickHandler);
  }

  clearAddToHistoryClickHandler() {
    this._callback.addToHistoryClick = null;
    this.element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._addToHistoryClickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchListClickHandler);
  }

  clearAddToWatchListClickHandler() {
    this._callback.addToWatchListClick = null;
    this.element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._addToWatchListClickHandler);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }

  setAddToFavoriteClickHandler(callback) {
    this._callback.addToFavoriteClick = callback;
    this.element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._addToFavoriteClickHandler);
  }

  clearAddToFavoriteClickHandler() {
    this._callback.addToFavoriteClick = null;
    this.element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._addToFavoriteClickHandler);
  }
}
