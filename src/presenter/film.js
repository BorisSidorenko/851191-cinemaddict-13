import FilmCardView from "../view/film-card/film-card";
import {render, RenderPosition, remove} from "../utils/render";

export default class Film {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;
    this._filmCard = null;
    this._cardComments = null;
  }

  init(filmCard, cardComments) {
    this._filmCard = filmCard;
    this._cardComments = cardComments;

    const commentsCount = this._cardComments.length;
    const filmCardComponent = new FilmCardView(filmCard, commentsCount);

    render(this._filmsListContainer, filmCardComponent);
  }
}
