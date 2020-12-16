import ProfileView from "../view/profile/profile";
import SiteFilterView from "../view/site-menu/site-menu";
import SortView from "../view/sort/sort";
import FilmsWrapperView from "../view/films/films";
import FilmsListView from "../view/films-list/films-list";
import EmptyFilmsListView from "../view/films-list-empty/films-list-empty";
import FilmsListContainer from "../view/films-list-container/films-list-container";
import ShowMoreButtonView from "../view/show-more-button/show-more-button";
import FilmsCountView from "../view/films-count/films-count";
import FilmPresenter from "../presenter/film";
import {getRandomIntInRange, updateItem, isEscEvent} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

const CARDS_TO_SHOW_COUNT = 5;

const MIN_PROFILE_RANK = 0;
const MAX_PROFILE_RANK = 40;

export default class FilmList {
  constructor(headerContainer, mainContainer, footerContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._profileComponent = new ProfileView(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK));
    this._sortComponent = new SortView();
    this._filmsWrapperComponent = new FilmsWrapperView();
    this._filmsListComponent = new FilmsListView();
    this._emptyFilmsListComponent = new EmptyFilmsListView();
    this._filmsListContainerComponent = new FilmsListContainer();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._filmCardComponent = null;
    this._filmsCards = null;
    this._comments = null;
    this._showMoreButtonClickCounter = 1;
    this._filmPresenter = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleOpenedPopup = this._handleOpenedPopup.bind(this);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._clickedCard = null;
    this._handlePopupEscKeyDown = this._handlePopupEscKeyDown.bind(this);
  }

  init(filmsCards, comments) {
    this._filmsCards = filmsCards.slice();
    this._comments = Object.assign({}, comments);

    this._renderProfile();

    this._renderFilmsList();

    this._renderFilmsCount();
  }

  _renderProfile() {
    render(this._headerContainer, this._profileComponent);
  }

  _renderFilter() {
    const filterComponent = new SiteFilterView(this._filmsCards);
    render(this._mainContainer, filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent);
  }

  _renderFilmsWrapper() {
    render(this._mainContainer, this._filmsWrapperComponent);
  }

  _renderFilmsList() {
    if (this._filmsCards.length === 0) {
      this._renderEmptyFilmsList();
      return;
    }

    this._renderFilter();
    this._renderSort();

    render(this._mainContainer, this._filmsListComponent);

    this._renderFilmsListContainer();
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
    render(this._filmsWrapperComponent, this._emptyFilmsListComponent);
  }

  _handleShowMoreButtonClick() {
    this._showMoreButtonClickCounter++;

    const cardsToShow = this._filmsCards.slice(0, CARDS_TO_SHOW_COUNT * this._showMoreButtonClickCounter);

    this._renderFilmsCards(cardsToShow);

    if (cardsToShow.length === this._filmsCards.length) {
      remove(this._showMoreButtonComponent);
    } else {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsCount() {
    const filmsCountComponent = new FilmsCountView(this._filmsCards.length);
    render(this._footerContainer, filmsCountComponent);
  }

  _renderFilmCard(cardToShow) {
    const filmPresenter = new FilmPresenter(this._comments, this._mainContainer, this._filmsListContainerComponent, this._handleFilmChange, this._handleFilmCardClick, this.__handleClosePopupButtonClick);
    filmPresenter.init(this._filmsCards, cardToShow);
    this._filmPresenter[cardToShow.id] = filmPresenter;
  }

  _renderFilmsCards(cardsToShow) {
    this._clearFilmListContainer();
    cardsToShow.forEach((cardToShow) => this._renderFilmCard(cardToShow));
  }

  _clearFilmListContainer() {
    const filmPresenters = Object.values(this._filmPresenter);
    if (filmPresenters.length > 0) {
      filmPresenters.forEach((presenter) => presenter.destroy());
      this._filmPresenter = {};

      remove(this._showMoreButtonComponent);
    }
  }

  _handleFilmChange(updatedFilm) {
    this._filmsCards = updateItem(this._filmsCards, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(this._filmsCards, updatedFilm);
  }

  _handleOpenedPopup() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.closeOpenedPopup());
  }

  _handleClosePopupButtonClick() {
    this._filmPresenter[this._clickedCard.id].closePopup();
    document.removeEventListener(`keydown`, this._handlePopupEscKeyDown);
  }

  _onPopupEscPress(evt) {
    isEscEvent(evt, this._handleClosePopupButtonClick.bind(this));
  }

  _handlePopupEscKeyDown(evt) {
    this._onPopupEscPress(evt);
  }

  _getClickedCard(id) {
    return this._filmsCards.find((el) => el.id === id);
  }

  _isPopupElementClicked(className) {
    return ELEMENTS_TO_SHOW_POPUP.some((val) => val === className);
  }

  _handleFilmCardClick(evt) {
    const showPopup = this._isPopupElementClicked(evt.target.className);

    if (showPopup) {
      evt.preventDefault();

      const cardId = evt.target.parentNode.dataset.id;
      this._clickedCard = this._getClickedCard(cardId);

      if (this._clickedCard) {
        this._handleOpenedPopup();
        this._filmPresenter[this._clickedCard.id].renderPopup(this._clickedCard);
        document.addEventListener(`keydown`, this._handlePopupEscKeyDown);
      }
    }
  }
}
