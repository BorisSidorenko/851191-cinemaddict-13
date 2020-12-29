import Observer from "../utils/observer";
import {UserAction} from "../utils/constants";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = {};
  }

  set allComments(comments) {
    this._comments = Object.assign(
        {},
        comments
    );
  }

  get allComments() {
    return this._comments;
  }

  _addComment(comment) {
    let filmComments = this._comments[comment.filmId];

    filmComments = [comment, ...filmComments.slice()];

    this._comments[comment.filmId] = filmComments;
  }

  _deleteComment({filmId, id}) {
    let filmComments = this._comments[filmId];

    const commentToDeleteIndex = filmComments.findIndex((comment) => comment.id === id);

    if (commentToDeleteIndex !== -1) {
      filmComments = [
        ...filmComments.slice(0, commentToDeleteIndex),
        ...filmComments.slice(commentToDeleteIndex + 1)
      ];

      this._comments[filmId] = filmComments;
    }
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
