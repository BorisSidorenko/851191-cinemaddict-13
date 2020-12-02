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
import {isEscEvent, getRandomIntInRange, renderElement, RenderPosition} from "./utils";
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

renderElement(siteHeaderElement, profileComponent.element);
renderElement(siteMainElement, siteMenuComponent.element, RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, sortComponent.element);

const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const emptyFilmsList = new EmptyFilmsListView();
const filmsListContainerComponent = new FilmListContainer();

renderElement(siteMainElement, filmsWrapperComponent.element);

if (allFilmcards.length > 0) {
  renderElement(filmsWrapperComponent.element, filmsListComponent.element);
} else {
  sortComponent.element.remove();
  sortComponent.removeElement();
  renderElement(filmsWrapperComponent.element, emptyFilmsList.element);
}

renderElement(filmsListComponent.element, filmsListContainerComponent.element);

const showMoreButtonComponent = new ShowMoreButtonView();
renderElement(filmsListComponent.element, showMoreButtonComponent.element);

const renderFilmCards = (cardsToShow) => {
  cardsToShow.forEach((cardToShow) => {
    const commentsCount = getFilmCardComments(cardToShow).length;
    const filmCard = new FilmCardView(cardToShow, commentsCount).element;
    renderElement(filmsListContainerComponent.element, filmCard);
  });
};

const appendFilmCards = (cardsToShow) => {
  filmsListContainerComponent.element.innerHTML = ``;

  renderFilmCards(cardsToShow);

  if (allFilmcards.length === cardsToShow.length) {
    showMoreButtonComponent.element.remove();
    showMoreButtonComponent.removeElement();
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

showMoreButtonComponent.element.addEventListener(`click`, onShowMoreButtonClick);

const filmsCountComponent = new FilmsCountView(allFilmcards.length);
renderElement(siteFooterElement, filmsCountComponent.element);

const filmPopupComponent = new FilmPopupView();
const closePopupButtonComponent = new ClosePopupButtonView();

const closePopup = () => {
  filmPopupComponent.element.remove();
  filmPopupComponent.removeElement();

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButtonComponent.element.removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const appendFooterWithPopup = (popupForm, popupTopContainer, popupBottomContainer) => {
  const filmPopup = filmPopupComponent.element;
  renderElement(siteBodyElement, filmPopup);
  renderElement(filmPopup, popupForm);
  renderElement(popupForm, popupTopContainer);
  renderElement(popupForm, popupBottomContainer);
};

const appendPopupWithCloseButton = (popupTopContainer) => {

  renderElement(popupTopContainer, closePopupButtonComponent.element);

  closePopupButtonComponent.element.addEventListener(`click`, closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  const filmPopupInfoWrap = new FilmPopupInfoWrapView().element;
  renderElement(popupTopContainer, filmPopupInfoWrap);

  renderElement(filmPopupInfoWrap, new FilmPopupPosterView(card).element);
  renderElement(filmPopupInfoWrap, new FilmPopupInfoView(card).element);
};

const filmPopupControlsComponent = new FilmPopupControlsView();
const appendPopupWithControls = (popupTopContainer) => renderElement(popupTopContainer, filmPopupControlsComponent.element);

const renderPopupTopContainer = (popupTopContainer, card) => {
  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  const filmPopupCommentsWrapComponent = new FilmPopupCommentsWrapView(cardComments.length);
  renderElement(popupBottomContainer, filmPopupCommentsWrapComponent.element);

  renderElement(filmPopupCommentsWrapComponent.element, new FilmPopupCommentsListView(cardComments).element);
  renderElement(filmPopupCommentsWrapComponent.element, new FilmPopupNewCommentView().element);
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

filmsListContainerComponent.element.addEventListener(`click`, onFilmCardClick);

