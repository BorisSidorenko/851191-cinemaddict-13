import {createElement} from "../utils";

const Ranks = {
  NOVICE: `Novice`,
  NOVICE_FILMS_MAX: 10,
  FAN: `Fan`,
  FAN_FILMS_MAX: 20,
  MOVIEBUFF: `Movie Buff`
};

const getRank = (fimlsCount) => {
  let rank = ``;

  if (fimlsCount > 0 && fimlsCount <= Ranks.NOVICE_FILMS_MAX) {
    rank = Ranks.NOVICE;
  } else if (fimlsCount > Ranks.NOVICE_FILMS_MAX && fimlsCount <= Ranks.FAN_FILMS_MAX) {
    rank = Ranks.FAN;
  } else if (fimlsCount > Ranks.FAN_FILMS_MAX) {
    rank = Ranks.MOVIEBUFF;
  }

  return rank;
};

const createProfileTemplate = (fimlsCount) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getRank(fimlsCount)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile {
  constructor(filmsCount) {
    this._element = null;
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
