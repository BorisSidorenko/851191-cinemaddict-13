import Observer from "../utils/observer";
import {UserAction} from "../utils/constants";
import clonedeep from "lodash.clonedeep";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
    this._notify(true);
  }

  getComments() {
    return clonedeep(this._comments);
  }

  _addComment(comment) {
    this._comments = [comment, ...this._comments.slice()];
  }

  _deleteComment(filmCard, commentToDelete) {
    this._comments[filmCard.id] = this._comments[filmCard.id].filter((comment) => comment.id !== commentToDelete.id);
  }

  getFilmCardComments({id}) {
    return this._comments[id];
  }

  updateComments(userAction, filmCard, commentToDelete) {
    switch (userAction) {
      case UserAction.ADD_COMMENT:
        this._addComment(filmCard, commentToDelete);
        break;
      case UserAction.DELETE_COMMENT:
        this._deleteComment(filmCard, commentToDelete);
        break;
    }

    this._notify(false);
  }
}
