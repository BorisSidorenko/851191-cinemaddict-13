import {createElement} from "../utils";

const createFilmPopupTemplate = () => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
      </div>
      <div class="film-details__bottom-container">
      </div>
    </form>
  </section>`;
};

export default class FilmPopup {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmPopupTemplate();
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
