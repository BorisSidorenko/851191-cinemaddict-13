import Observer from "../utils/observer";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
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
}
