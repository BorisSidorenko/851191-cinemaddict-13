import {nanoid} from "C:/Users/boris/Desktop/HtmlAcademy/851191-cinemaddict-13/src/vendor/nanoid";
import dayjs from "dayjs";

const CARD_AMOUNT_TO_GENERATE = 20;

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

const titles = {
  [`Побег из Шоушенка`]: `The Shawshank Redemption`,
  [`Крестный отец`]: `The Godfather`,
  [`Тёмный рыцарь`]: `The Dark Knight`,
  [`12 Разгеванных мужчин`]: `12 Angry Men`,
  [`Список Шиндлера`]: `Schindler's List`
};

const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomRating = (max, min) => {
  const raiting = getRandomInt(max, min);
  return raiting === max ? raiting : `${raiting}.${getRandomInt(max - 1, min)}`;
};

const getRandomValuesFromArray = (size, source) => Array(size).fill().map(() => source[getRandomInt(source.length - 1)]);

const getRandomPoster = () => POSTERS_PATH + POSTERS[getRandomInt(POSTERS.length - 1)];

let originalTitle = ``;

const getRandomTitle = () => {
  const arr = Object.keys(titles);
  const title = arr[getRandomInt(arr.length - 1)];
  originalTitle = titles[title];
  return title;
};

const getRandonGenres = () => getRandomValuesFromArray(getRandomInt(MAX_GENRES_AMOUNT, MIN_GENERS_AMOUNT), GENRES);

const getShortDescription = () => `${DESCRIPTION.substring(0, DESCRIPTION_SHORT_LENGTH)}...`;

const getRandomDuration = (max, min) => {
  const duration = getRandomInt(max, min);

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

const getRandomDirector = () => DIRECTORS[getRandomInt(DIRECTORS.length - 1)];

const getRandomWriters = () => getRandomValuesFromArray(SCREENWRITERS_PER_FILM, SCREENWRITERS).join(`, `);

const getRandomActors = () => getRandomValuesFromArray(ACTORS_PER_FILM, ACTORS).join(`, `);

const getRandomCountry = () => COUNTRIES[getRandomInt(COUNTRIES.length - 1)];

const getRandomAgeRating = () => `${getRandomInt(MIN_AGE_RATING, MAX_AGE_RATING)}+`;

const getRandomReleaseDate = (startYear, endYear) => {
  const date = new Date(new Date(startYear, 0, 1).getTime() + Math.random() * (new Date(endYear, 0, 1).getTime() - new Date(startYear, 0, 1).getTime()));
  return dayjs(date).format('DD MMMM YYYY');
};

export const generateFilmCard = () => {
  return {
    id: nanoid(8),
    poster: getRandomPoster(),
    title: getRandomTitle(),
    rating: getRandomRating(MAX_RATING, MIN_RATING),
    year: getRandomInt(MIN_YEAR, MAX_YEAR),
    duration: getRandomDuration(MAX_DURATION, MIN_DURATION),
    genres: getRandonGenres(),
    descriptionShort: getShortDescription(),
    description: DESCRIPTION,
    commentsCount: getRandomInt(MIN_COMMENTS, MAX_COMMENTS),
    titleOriginal: originalTitle,
    director: getRandomDirector(),
    screenwriters: getRandomWriters(),
    actors: getRandomActors(),
    releaseDate: getRandomReleaseDate(MIN_YEAR, MAX_YEAR),
    country: getRandomCountry(),
    ageRating: getRandomAgeRating()
  };
};

export const generateFilmCards = () => Array(CARD_AMOUNT_TO_GENERATE).fill().map(() => generateFilmCard());
