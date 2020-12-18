export const CARDS_TO_SHOW_COUNT = 5;

export const ProfileRank = {
  MIN: 0,
  MAX: 40
};

export const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

const CONTROL_CLASS = `film-card__controls-item`;

export const CardControls = {
  WATCHLIST: `${CONTROL_CLASS}--add-to-watchlist`,
  WATCHED: `${CONTROL_CLASS}--mark-as-watched`,
  FAVORITE: `${CONTROL_CLASS}--favorite`
};
