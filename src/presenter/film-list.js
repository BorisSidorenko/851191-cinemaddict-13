import ProfileView from "../view/profile/profile";
import SiteFilterView from "../view/site-menu";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import FilmCardView from "ю./view/film-card/film-card";
import {getRandomIntInRange} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";

const CARDS_TO_SHOW_COUNT = 5;

const MIN_PROFILE_RANK = 0;
const MAX_PROFILE_RANK = 40;

export default class FilmList {
  constructor(headerContainer, mainContainer, footerContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._profileComponent = new ProfileView(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK));
    this._filterComponent = new SiteFilterView();
    this._sortComponent = new SortView();
    this._filmsWrapperComponent = new FilmsWrapperView();
    this._filmsListComponent = new FilmsListView();
    this._emptyFilmsListComponent = new EmptyFilmsListView();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._filmCardComponent = null;
    this._filmsCards = null;
    this._comments = null;
  }

  init(filmsCards, comments) {
    this._filmsCards = filmsCards.slice();
    this._comments = comments.slice();

    this._renderProfile();

    this._renderFilmsList();

    this._renderFilmsCount();
  }

  _renderProfile() {
    render(this._headerContainer, this._profileComponent);
  }

  _renderFilter() {
    render(this._mainContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent);
  }

  _renderFilmsWrapper() {
    render(this._mainContainer, this._filmsWrapperComponent);
  }

  _renderFilmsList() {
    if (this._filmsCards.length > 0) {
      this._renderEmptyFilmsList();
      return;
    }

    this._renderSort();
    this._renderFilter();

    this._renderFilmsCards(this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT));

    if (this._filmsCards.length > CARDS_TO_SHOW_COUNT) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsListContainer() {
    render(this._filmsListComponent, this._filmsListContainerComponent);
  }

  _renderEmptyFilmsList() {
    remove(this._sortComponent);
    render(this._filmsWrapperComponent, this._emptyFilmsList);
  }

  _renderShowMoreButton() {
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButtonComponent);

    let showMoreButtonClickCounter = 1;

    const onShowMoreButtonClick = () => {
      showMoreButtonClickCounter++;

      const cardsToShow = this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter);
      cardsToShow.forEach((cardToShow) => this._renderFilmCard(cardToShow));

      if (cardsToShow.length === this._filmsCards.length) {
        remove(showMoreButtonComponent);
      }
    };

    this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
  }

  _renderFilmsCount() {
    const filmsCountComponent = new FilmsCountView();
    render(this._footerContainer, filmsCountComponent);
  }

  _renderFilmCard(cardToShow) {
    const commentsCount = this._getFilmCardComments(cardToShow).length;
    this._filmCardComponent = new FilmCardView(cardToShow, commentsCount);
    this._renderFilmsListContainer();
    render(this._filmsListContainerComponent, this._filmCardComponent);
  }

  _getFilmCardComments({id}) {
    return this._comments[id];
  }

  _renderFilmsCards(cardsToShow) {
    cardsToShow.forEach((cardToShow) => this._renderFilmCard(cardToShow));
  }
}
