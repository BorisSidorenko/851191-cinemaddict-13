export const CARDS_TO_SHOW_COUNT = 5;

export const MINUTES_IN_HOUR = 60;

export const ProfileRank = {
  MIN: 0,
  MAX: 40
};

export const RELEASE_DATE_FORMAT = `DD MMMM YYYY`;
export const COMMENT_DATE_FORMAT = `YYYY/MM/DD hh:mm`;

export const DESCRIPTION_SHORT_LENGTH = 139;

export const MAX_MONTH = 12;
export const MIN_MONTH = 1;

export const ELEMENTS_TO_SHOW_POPUP = [
  `film-card__poster`,
  `film-card__title`,
  `film-card__comments`
];

export const EMOJI_PATH = `././images/emoji/`;
export const EMOJI_EXTENSION = `.png`;

const CONTROL_CLASS = `film-card__controls-item`;

export const CardControls = {
  WATCHLIST: `${CONTROL_CLASS}--add-to-watchlist`,
  WATCHED: `${CONTROL_CLASS}--mark-as-watched`,
  FAVORITE: `${CONTROL_CLASS}--favorite`
};

export const PopupControlsName = {
  watchlist: `watchlist`,
  alreadyWatched: `watched`,
  favorite: `favorite`
};

export const UserDetails = {
  WATCHLIST: `watchlist`,
  ALREADY_WATCHED: `alreadyWatched`,
  FAVORITE: `favorite`
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const MenuItem = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};

export const UserAction = {
  ADD_COMMENT: `ADD`,
  DELETE_COMMENT: `DELETE`
};

export const Rank = {
  NOVICE: `Novice`,
  NOVICE_FILMS_MAX: 10,
  FAN: `Fan`,
  FAN_FILMS_MAX: 20,
  MOVIEBUFF: `Movie Buff`
};

export const STATISTICS_BAR_HEIGHT = 50;

export const StatisticsPeriod = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  DAY: `day`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};
