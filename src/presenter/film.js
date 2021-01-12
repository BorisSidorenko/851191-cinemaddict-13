import dayjs from "dayjs";
import FilmCardView from "../view/film-card/film-card";
import {render, remove, replace} from "../utils/render";
import {CardControls, ELEMENTS_TO_SHOW_POPUP} from "../utils/constants";

export default class FilmPresenter {
  constructor({mainContainer, filmsListContainer, changeData, cardClick}) {
    this._mainContainer = mainContainer;
    this._filmsListContainerComponent = filmsListContainer;
    this._changeData = changeData;
    this._filmsCards = null;
    this._cardClick = cardClick;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleCardControlClick = this._handleCardControlClick.bind(this);
    this._filmCard = null;
    this._filmCardComponent = null;
  }

  init(filmsCards, filmCard, filmCardCommentsLength) {
    this._filmsCards = filmsCards;
    this._filmCard = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(filmCard, filmCardCommentsLength);

    this._setHandlers();

    if (prevFilmCardComponent === null) {
      render(this._filmsListContainerComponent, this._filmCardComponent);
      return;
    }

    if (this._filmsListContainerComponent.element.contains(prevFilmCardComponent.element)) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _setHandlers() {
    this._filmsListContainerComponent.setClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setControlsClickHandler(this._handleCardControlClick);
  }

  destroy() {
    remove(this._filmCardComponent);
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
      const clickedCard = this._getClickedCard(cardId);

      if (clickedCard) {
        this._cardClick(clickedCard);
      }
    }
  }

  _handleCardControlClick(evt) {
    const propToChange = this._getClickedProp(evt.target.classList);

    const updatedUserDetails = Object.assign(
        {},
        this._filmCard.userDetails,
        propToChange
    );

    const updatedFilmCard = Object.assign(
        {},
        this._filmCard,
        {
          userDetails: updatedUserDetails
        }
    );

    this._changeData(updatedFilmCard);
  }

  _getClickedProp(classList) {
    if (classList.contains(CardControls.WATCHLIST)) {
      return {
        watchlist: !this._filmCard.userDetails.watchlist
      };
    } else if (classList.contains(CardControls.WATCHED)) {
      return {
        alreadyWatched: !this._filmCard.userDetails.alreadyWatched,
        watchingDate: dayjs().format()
      };
    } else {
      return {
        favorite: !this._filmCard.userDetails.favorite
      };
    }
  }
}
