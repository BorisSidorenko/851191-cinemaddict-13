import {nanoid} from "../vendor/nanoid";
import {getRandomIntInRange, getRandomInt, getRandomDateInYearRange, getArrayOfObjects} from "../utils/common";

const CARD_AMOUNT_TO_GENERATE = 30;

const MINUTES_IN_HOUR = 60;

const MIN_YEAR = 1950;
const MAX_YEAR = 2008;

const MIN_RATING = 1;
const MAX_RATING = 10;

const MIN_AGE_RATING = 6;
const MAX_AGE_RATING = 18;

const MIN_DURATION = 70;
const MAX_DURATION = 134;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 100;

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const DESCRIPTION_SHORT_LENGTH = 139;

const POSTERS_PATH = `././images/posters/`;
const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const MIN_GENERS_AMOUNT = 1;
const MAX_GENRES_AMOUNT = 3;

const GENRES = [
  `Fantasy`,
  `Thriller`,
  `Mystery`,
  `Romance`,
  `Comedy`,
  `Western`
];

const DIRECTORS = [
  `Frank Darabont`,
  `Francis Ford Coppola`,
  `Christopher Nolan`,
  `Sidney Lumet`,
  `Steven Spielberg`
];

const SCREENWRITERS_PER_FILM = 2;

const SCREENWRITERS = [
  `Stephen King`,
  `Frank Darabont`,
  `Mario Puzo`,
  `Francis Ford Coppola`,
  `Jonathan Nolan`,
  `Christopher Nolan`,
  `Reginald Rose`,
  `Thomas Keneally`,
  `Steven Zaillian`
];

const ACTORS_PER_FILM = 3;

const ACTORS = [
  `Tim Robbins`,
  `Morgan Freeman`,
  `Bob Gunton`,
  `Marlon Brando`,
  `Al Pacino`,
  `James Caan`,
  `Christian Bale`,
  `Heath Ledger`,
  `Aaron Eckhart`,
  `Henry Fonda`,
  `Lee J. Cobb`,
  `Martin Balsam`,
  `Liam Neeson`,
  `Ralph Fiennes`,
  `Ben Kingsley`
];

const COUNTRIES = [
  `USA`,
  `Russia`,
  `Italy`,
  `Spain`,
  `Germany`,
  `United Kingdom`,
  `China`,
  `Japan`
];

const title = {
  [`Побег из Шоушенка`]: `The Shawshank Redemption`,
  [`Крестный отец`]: `The Godfather`,
  [`Тёмный рыцарь`]: `The Dark Knight`,
  [`12 Разгеванных мужчин`]: `12 Angry Men`,
  [`Список Шиндлера`]: `Schindler's List`
};

const RELEASE_DATE_FORMAT = `DD MMMM YYYY`;

const getRandomRating = (max, min) => {
  const raiting = getRandomIntInRange(max, min);
  return raiting === max ? raiting : `${raiting}.${getRandomIntInRange(max - 1, min)}`;
};

const getRandomValuesFromArray = (size, source) => {
  return Array(size).fill().map(() => {
    const index = getRandomInt(source.length);
    return source[index];
  });
};

const getRandomPoster = () => POSTERS_PATH + POSTERS[getRandomInt(POSTERS.length)];

let originalTitle = ``;

const getRandomTitle = () => {
  const arr = Object.keys(title);
  const translatedTitle = arr[getRandomInt(arr.length)];
  originalTitle = title[translatedTitle];
  return translatedTitle;
};

const getRandonGenres = () => {
  const genresCount = getRandomIntInRange(MAX_GENRES_AMOUNT, MIN_GENERS_AMOUNT);
  return getRandomValuesFromArray(genresCount, GENRES);
};

const getShortDescription = () => `${DESCRIPTION.substring(0, DESCRIPTION_SHORT_LENGTH)}...`;

const getRandomDuration = (max, min) => {
  const duration = getRandomIntInRange(max, min);

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

const getRandomDirector = () => DIRECTORS[getRandomInt(DIRECTORS.length)];

const getRandomWriters = () => {
  const screenwriters = getRandomValuesFromArray(SCREENWRITERS_PER_FILM, SCREENWRITERS);
  return screenwriters.join(`, `);
};

const getRandomActors = () => getRandomValuesFromArray(ACTORS_PER_FILM, ACTORS).join(`, `);

const getRandomCountry = () => COUNTRIES[getRandomInt(COUNTRIES.length)];

const getRandomAgeRating = () => `${getRandomIntInRange(MIN_AGE_RATING, MAX_AGE_RATING)}+`;

const getRandomReleaseDate = (startYear, endYear) => getRandomDateInYearRange(startYear, endYear, RELEASE_DATE_FORMAT);

const getRandomBool = () => getRandomIntInRange(0, 1) > 0;

export const generateFilmCard = () => ({
  id: nanoid(8),
  poster: getRandomPoster(),
  title: getRandomTitle(),
  rating: getRandomRating(MAX_RATING, MIN_RATING),
  year: getRandomIntInRange(MIN_YEAR, MAX_YEAR),
  duration: getRandomDuration(MAX_DURATION, MIN_DURATION),
  genres: getRandonGenres(),
  descriptionShort: getShortDescription(),
  description: DESCRIPTION,
  commentsCount: getRandomIntInRange(MIN_COMMENTS, MAX_COMMENTS),
  titleOriginal: originalTitle,
  director: getRandomDirector(),
  screenwriters: getRandomWriters(),
  actors: getRandomActors(),
  releaseDate: getRandomReleaseDate(MIN_YEAR, MAX_YEAR),
  country: getRandomCountry(),
  ageRating: getRandomAgeRating(),
  isWatchlist: getRandomBool(),
  isHistory: getRandomBool(),
  isFavorite: getRandomBool()
});

export const generateFilmCards = () => getArrayOfObjects(CARD_AMOUNT_TO_GENERATE, generateFilmCard);
