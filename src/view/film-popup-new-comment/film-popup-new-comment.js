import AbstractView from "../abstract-component";
import {createFilmPopupNewCommentTemplate} from "../film-popup-new-comment/film-popup-new-comment-template";

export default class FilmPopupNewComment extends AbstractView {
  getTemplate() {
    return createFilmPopupNewCommentTemplate();
  }
}
