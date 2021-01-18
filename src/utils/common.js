import {Rank, MINUTES_IN_HOUR, DESCRIPTION_SHORT_LENGTH} from "../utils/constants";

const KeyCode = {
  ESC_CODE: `Escape`,
  ENTER: `Enter`
};

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

export const getWatchedFilms = (films) => films.filter(({user_details: userDetails}) => userDetails.already_watched);

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

export const getFilmsDuration = (films) => {
  const totalDuration = films.reduce((total, {film_info: filmInfo}) => {
    return total + filmInfo.runtime;
  }, 0);

  return totalDuration;
};

export const getWatchedFilmsGenresAndCount = (watchedFilms) => {
  const watchedGenres = watchedFilms.map(({film_info: filmInfo}) => filmInfo.genre).flat();

  const genresAndCount = {};
  watchedGenres.forEach((genre) => {
    genresAndCount[genre] = (genresAndCount[genre] || 0) + 1;
  });


  return Object.entries(genresAndCount).slice().sort((a, b) => b[1] - a[1]);
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

export const getShortDescription = (description) => `${description.substring(0, DESCRIPTION_SHORT_LENGTH)}...`;
