import Observer from "../utils/observer";
import {UserAction} from "../utils/constants";
import clonedeep from "lodash.clonedeep";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = {};
  }

  setComments(filmId, comments) {
    this._comments[filmId] = comments.slice();
  }

  get comments() {
    return clonedeep(this._comments);
  }

  _addComment(comment) {
    this._comments = [comment, ...this._comments.slice()];
  }

  _deleteComment({id}) {
    this._comments = this._comments.filter((comment) => comment.id !== id);
  }

  getFilmCardComments(id) {
    return this._comments[id];
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
