import SiteMenuView from "./view/site-menu";
import ProfileView from "./view/profile";
import SortView from "./view/sort";
import ShowMoreButtonView from "./view/show-more-button";
import FilmsCountView from "./view/films-count";
import FilmsWrapperView from "./view/films";
import FilmsListView from "./view/films-list";
import FilmListContainer from "./view/films-list-container";
import FilmCardView from "./view/film-card";
import FilmPopupView from "./view/film-popup";
import ClosePopupButtonView from "./view/close-popup-button";
import FilmPopupInfoWrapView from "./view/film-popup-info-wrap";
import FilmPopupPosterView from "./view/film-popup-poster";
import FilmPopupInfoView from "./view/film-popup-info";
import FilmPopupControlsView from "./view/film-popup-controls";
import {createFilmPopupCommentsWrap} from "./view/film-popup-comments-wrap";
import {createFilmPopupCommentsList} from "./view/film-popup-comments-list";
import {createFilmPopupNewComment} from "./view/film-popup-new-comment";
import {isEscEvent, getRandomIntInRange, renderTemplate, renderElement, RenderPosition} from "./utils";
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

renderElement(siteHeaderElement, new ProfileView(getRandomIntInRange(MAX_PROFILE_RANK, MIN_PROFILE_RANK)).getElement());
renderElement(siteMainElement, new SiteMenuView(allFilmcards).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SortView().getElement());

const filmsWrapperComponent = new FilmsWrapperView();
const filmsListComponent = new FilmsListView();
const filmsListContainerComponent = new FilmListContainer();

renderElement(siteMainElement, filmsWrapperComponent.getElement());
renderElement(filmsWrapperComponent.getElement(), filmsListComponent.getElement());
renderElement(filmsListComponent.getElement(), filmsListContainerComponent.getElement());

const showMoreButtonComponent = new ShowMoreButtonView();
renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

const renderFilmCards = (cardsToShow) => {
  cardsToShow.forEach((cardToShow) => {
    const commentsCount = getFilmCardComments(cardToShow).length;
    const filmCard = new FilmCardView(cardToShow, commentsCount).getElement();
    renderElement(filmsListContainerComponent.getElement(), filmCard);
  });
};

const appendFilmCards = (cardsToShow) => {
  filmsListContainerComponent.getElement().innerHTML = ``;

  renderFilmCards(cardsToShow);

  if (allFilmcards.length === cardsToShow.length) {
    showMoreButtonComponent.getElement().remove();
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

showMoreButtonComponent.getElement().addEventListener(`click`, onShowMoreButtonClick);

renderElement(siteFooterElement, new FilmsCountView(allFilmcards.length).getElement());

const closePopup = () => {
  const filmPopup = siteBodyElement.querySelector(`.film-details`);
  const closePopupButton = filmPopup.querySelector(`.film-details__close-btn`);

  filmPopup.remove();

  siteBodyElement.classList.toggle(`hide-overflow`);
  closePopupButton.removeEventListener(`click`, closePopup);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, closePopup);
};

const appendFooterWithPopup = () => renderElement(siteBodyElement, new FilmPopupView().getElement());

const appendPopupWithCloseButton = (popupTopContainer) => {
  renderElement(popupTopContainer, new ClosePopupButtonView().getElement());

  const closePopupButton = popupTopContainer.querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, closePopup);
};

const appendPopupWithInfo = (popupTopContainer, card) => {
  const filmPopupInfoWrapComponent = new FilmPopupInfoWrapView();
  renderElement(popupTopContainer, filmPopupInfoWrapComponent.getElement());

  renderElement(filmPopupInfoWrapComponent.getElement(), new FilmPopupPosterView(card).getElement());
  renderElement(filmPopupInfoWrapComponent.getElement(), new FilmPopupInfoView(card).getElement());
};

const appendPopupWithControls = (popupTopContainer) => renderElement(popupTopContainer, new FilmPopupControlsView().getElement());

const renderPopupTopContainer = (popupForm, card) => {
  const popupTopContainer = popupForm.querySelector(`.film-details__top-container`);

  appendPopupWithCloseButton(popupTopContainer);
  appendPopupWithInfo(popupTopContainer, card);
  appendPopupWithControls(popupTopContainer);
};

const appendPopupWithComments = (popupBottomContainer, cardComments) => {
  renderTemplate(popupBottomContainer, createFilmPopupCommentsWrap(cardComments.length));
  const commentsWrap = popupBottomContainer.querySelector(`.film-details__comments-wrap`);

  renderTemplate(commentsWrap, createFilmPopupCommentsList(cardComments));
  renderTemplate(commentsWrap, createFilmPopupNewComment());
};

const renderPopupBottomContainer = (popupForm, card) => {
  const cardComments = getFilmCardComments(card);
  const popupBottomContainer = popupForm.querySelector(`.film-details__bottom-container`);

  appendPopupWithComments(popupBottomContainer, cardComments);
};

const renderPopup = (card) => {
  appendFooterWithPopup();
  const popupForm = siteBodyElement.querySelector(`.film-details__inner`);

  renderPopupTopContainer(popupForm, card);
  renderPopupBottomContainer(popupForm, card);

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

filmsListContainerComponent.getElement().addEventListener(`click`, onFilmCardClick);

