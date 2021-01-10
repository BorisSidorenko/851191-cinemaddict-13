import Observer from "../utils/observer";
import {UserAction} from "../utils/constants";
import clonedeep from "lodash.clonedeep";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set comments(comments) {
    this._comments = comments.slice();
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

  getFilmCardComments({comments}) {
    const commentIds = comments;
    const cardComments = this._comments.filter((comment) => commentIds.find((commentId) => comment.id === commentId));

    return cardComments;
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
