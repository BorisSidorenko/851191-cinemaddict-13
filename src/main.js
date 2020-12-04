import SiteMenuView from "./view/site-menu/site-menu";
import ProfileView from "./view/profile/profile";
import SortView from "./view/sort/sort";
import ShowMoreButtonView from "./view/show-more-button/show-more-button";
import FilmsCountView from "./view/films-count/films-count";
import FilmsWrapperView from "./view/films/films";
import FilmsListView from "./view/films-list/films-list";
import EmptyFilmsListView from "./view/films-list-empty/films-list-empty";
import FilmListContainer from "./view/films-list-container/films-list-container";
import FilmCardView from "./view/film-card/film-card";
import FilmPopupView from "./view/film-popup/film-popup";
import ClosePopupButtonWrapperView from "./view/close-popup-button-wrapper/close-popup-button-wrapper";
import ClosePopupButtonView from "./view/close-popup-button/close-popup-button";
import FilmPopupInfoWrapView from "./view/film-popup-info-wrap/film-popup-info-wrap";
import FilmPopupPosterView from "./view/film-popup-poster/film-popup-poster";
import FilmPopupInfoView from "./view/film-popup-info/film-popup-info";
import FilmPopupFormView from "./view/film-popup-form/film-popup-form";
import FilmPopupTopContainerView from "./view/film-popup-top-container/film-popup-top-container";
import FilmPopupBottomContainerView from "./view/film-popup-bottom-container/film-popup-bottom-container";
import FilmPopupControlsView from "./view/film-popup-controls/film-popup-controls";
import FilmPopupCommentsWrapView from "./view/film-popup-comments-wrap/film-popup-comments-wrap";
import FilmPopupCommentsListView from "./view/film-popup-comments-list/film-popup-comments-list";
import FilmPopupNewCommentView from "./view/film-popup-new-comment/film-popup-new-comment";
import {render, remove, RenderPosition} from "./utils/render";
import {isEscEvent, getRandomIntInRange} from "./utils/common";
import {generateFilmCards} from "./mock/film-card";
import {generateComments} from "./mock/comment";

const CARDS_TO_SHOW_COUNT = 5;

const MIN_PROFILE_RANK = 0;
const MAX_PROFILE_RANK = 40;

const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

const allFilmcards = generateFilmCards();

const getAllComments = () => allFilmcards.reduce((acc, {id}) => {
  acc[id] = generateComments(id);
  return acc;
}, {});

const allComments = getAllComments();

const getFilmCardComments = ({id}) => allComments[id];

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterElement = siteBodyElement.querySelector(`.footer`);

const sortComponent = new SortView();
const profileComponent = new ProfileView(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK));
const siteMenuComponent = new SiteMenuView(allFilmcards);

render(siteHeaderElement, profileComponent);
render(siteMainElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
render(siteMainElement, sortComponent);

const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const emptyFilmsList = new EmptyFilmsListView();
const filmsListContainerComponent = new FilmListContainer();

render(siteMainElement, filmsWrapperComponent);

if (allFilmcards.length > 0) {
  render(filmsWrapperComponent, filmsListComponent);
} else {
  remove(sortComponent);
  render(filmsWrapperComponent, emptyFilmsList);
}

render(filmsListComponent, filmsListContainerComponent);

const showMoreButtonComponent = new ShowMoreButtonView();
render(filmsListComponent, showMoreButtonComponent);

const renderFilmCards = (cardsToShow) => {
  cardsToShow.forEach((cardToShow) => {
    const commentsCount = getFilmCardComments(cardToShow).length;
    const filmCardComponent = new FilmCardView(cardToShow, commentsCount);
    render(filmsListContainerComponent, filmCardComponent);
  });
};

const appendFilmCards = (cardsToShow) => {
  filmsListContainerComponent.element.innerHTML = ``;

  renderFilmCards(cardsToShow);

  if (allFilmcards.length === cardsToShow.length) {
    remove(showMoreButtonComponent);
  }
};

const initialCardsToShow = allFilmcards.slice(0, CARDS_TO_SHOW_COUNT);
appendFilmCards(initialCardsToShow);

let showMoreButtonClickCounter = 1;

const onShowMoreButtonClick = () => {
  showMoreButtonClickCounter++;

  const cardsToShow = allFilmcards.slice(0, CARDS_TO_SHOW_COUNT * showMoreButtonClickCounter);

  appendFilmCards(cardsToShow);
};

showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);

const filmsCountComponent = new FilmsCountView(allFilmcards.length);
render(siteFooterElement, filmsCountComponent);

const filmPopupComponent = new FilmPopupView();
const closePopupButtonWrapperComponent = new ClosePopupButtonWrapperView();
const closePopupButtonComponent = new ClosePopupButtonView();

const closePopup = () => {
  remove(filmPopupComponent);

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButtonComponent.clearClickHandler();
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const appendFooterWithPopup = (popupForm, popupTopContainer, popupBottomContainer) => {
  render(siteBodyElement, filmPopupComponent);
  render(filmPopupComponent, popupForm);
  render(popupForm, popupTopContainer);
  render(popupForm, popupBottomContainer);
};

const appendPopupWithCloseButton = (popupTopContainer) => {
  render(popupTopContainer, closePopupButtonWrapperComponent);
  render(closePopupButtonWrapperComponent, closePopupButtonComponent);
  closePopupButtonComponent.setClickHandler(closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  const filmPopupInfoWrapComponent = new FilmPopupInfoWrapView();
  render(popupTopContainer, filmPopupInfoWrapComponent);

  render(filmPopupInfoWrapComponent, new FilmPopupPosterView(card));
  render(filmPopupInfoWrapComponent, new FilmPopupInfoView(card));
};

const filmPopupControlsComponent = new FilmPopupControlsView();
const appendPopupWithControls = (popupTopContainer) => render(popupTopContainer, filmPopupControlsComponent);

const renderPopupTopContainer = (popupTopContainer, card) => {
  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  const filmPopupCommentsWrapComponent = new FilmPopupCommentsWrapView(cardComments.length);
  render(popupBottomContainer, filmPopupCommentsWrapComponent);

  render(filmPopupCommentsWrapComponent.element, new FilmPopupCommentsListView(cardComments));
  render(filmPopupCommentsWrapComponent.element, new FilmPopupNewCommentView());
};

const renderPopupBottomContainer = (popupBottomContainer, card) => {
  const cardComments = getFilmCardComments(card);
  appendPopupWithComments(popupBottomContainer, cardComments);
};

const renderPopup = (card) => {
  const popupForm = new FilmPopupFormView().element;
  const popupTopContainer = new FilmPopupTopContainerView().element;
  const popupBottomContainer = new FilmPopupBottomContainerView().element;

  appendFooterWithPopup(popupForm, popupTopContainer, popupBottomContainer);

  renderPopupTopContainer(popupTopContainer, card);
  renderPopupBottomContainer(popupBottomContainer, card);

  siteBodyElement.classList.toggle(`hide-overflow`);
};

const isPopupElementClicked = (className) => ELEMENTS_TO_SHOW_POPUP.some((val) => val === className);

const getCard = (id) => allFilmcards.find((el) => el.id === id);

const onFilmCardClick = (evt) => {
  const showPopup = isPopupElementClicked(evt.target.className);

  if (showPopup) {
    evt.preventDefault();

    const cardId = evt.target.parentNode.dataset.id;
    const clickedCard = getCard(cardId);

    if (clickedCard) {
      renderPopup(clickedCard);
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  }
};

filmsListContainerComponent.setClickHandler(onFilmCardClick);

