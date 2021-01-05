import Observer from "../utils/observer";
import {UserAction} from "../utils/constants";
import loadash from "lodash";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = {};
  }

  set comments(comments) {
    this._comments = Object.assign(
        {},
        comments
    );
  }

  get comments() {
    return loadash.cloneDeep(this._comments);
  }

  _addComment(comment) {
    let filmComments = loadash.cloneDeep(this._comments[comment.filmId]);

    filmComments = [comment, ...filmComments.slice()];

    this._comments[comment.filmId] = filmComments;
  }

  _deleteComment({filmId, id}) {
    let filmComments = loadash.cloneDeep(this._comments[filmId]);

    filmComments = filmComments.filter((comment) => comment.id !== id);

    this._comments[filmId] = filmComments;
  }

  getFilmCardComments(filmId) {
    return this._comments[filmId];
  }

  updateComments(userAction, comment) {
    switch (userAction) {
      case UserAction.ADD_COMMENT:
        this._addComment(comment);
        break;
      case UserAction.DELETE_COMMENT:
        this._deleteComment(comment);
        break;
    }

    this._notify();
  }
}
