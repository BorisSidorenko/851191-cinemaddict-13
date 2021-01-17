import SmartView from "../smart";
import {createFilmPopupNewCommentTemplate} from "../film-popup-new-comment/film-popup-new-comment-template";

export default class FilmPopupNewComment extends SmartView {
  constructor() {
    super();

    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopupNewCommentTemplate(this._data);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value
    });
  }

  _textInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value
    }, true);
  }

  _setInnerHandlers() {
    this.element.querySelector(`textarea`).addEventListener(`input`, this._textInputHandler);
    this.element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }
}
