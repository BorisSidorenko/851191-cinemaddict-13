import dayjs from "dayjs";
import {Rank, MINUTES_IN_HOUR} from "../utils/constants";

const KeyCode = {
  ESC_CODE: `Escape`,
  ENTER: `Enter`
};

const MAX_MONTH = 12;
const MIN_MONTH = 1;
const MAX_DATE = 31;
const MIN_DATE = 1;

export const isEscEvent = (evt, action) => {
  if (evt.key === KeyCode.ESC_CODE) {
    action();
  }
};

export const isSubmitFormEvent = (evt, action) => {
  if (evt.ctrlKey && evt.key === KeyCode.ENTER) {
    action();
  }
};

export const getRandomIntInRange = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomInt = (maxNumber) => getRandomIntInRange(maxNumber - 1);

export const getRandomDateInYearRange = (startYear, endYear, dateFormat) => {
  const year = getRandomIntInRange(startYear, endYear);
  const month = getRandomIntInRange(MAX_MONTH, MIN_MONTH);
  const date = getRandomIntInRange(MAX_DATE, MIN_DATE);

  return dayjs(`${year}-${month}-${date}`).format(dateFormat);
};

export const getArrayOfObjects = (count, cb) => Array(count).fill().map(() => cb());

export const getWatchedFilms = (films) => films.filter((film) => film.isWatchlist);

export const convertDurationIntoHours = (duration) => {
  if (duration > MINUTES_IN_HOUR) {
    if (duration % MINUTES_IN_HOUR > 0) {
      return `${Math.floor(duration / MINUTES_IN_HOUR)}h ${duration % MINUTES_IN_HOUR}m`;
    } else {
      return `${Math.floor(duration / MINUTES_IN_HOUR)}h`;
    }
  } else {
    return `${duration}m`;
  }
};

export const getWatchedFilmsDuration = (films) => {
  const watchedFilms = getWatchedFilms(films);

  const totalDuration = watchedFilms.reduce((total, current) => {
    return total + current.duration;
  }, 0);

  return totalDuration;
};

export const getRank = (films) => {
  const watchedFilmsCount = getWatchedFilms(films).length;
  let rank = ``;

  if (watchedFilmsCount >= 0 && watchedFilmsCount <= Rank.NOVICE_FILMS_MAX) {
    rank = Rank.NOVICE;
  } else if (watchedFilmsCount > Rank.NOVICE_FILMS_MAX && watchedFilmsCount <= Rank.FAN_FILMS_MAX) {
    rank = Rank.FAN;
  } else if (watchedFilmsCount > Rank.FAN_FILMS_MAX) {
    rank = Rank.MOVIEBUFF;
  }

  return rank;
};
