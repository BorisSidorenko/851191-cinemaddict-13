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

const GENRES = [
  `Fantasy`,
  `Thriller`,
  `Mystery`,
  `Romance`,
  `Comedy`,
  `Western`
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
const DESCRIPTION_SHORT_LENGTH = 139;

const MIN_YEAR = 1950;
const MAX_YEAR = 2008;

const MIN_RATING = 1;
const MAX_RATING = 10;

const MIN_DURATION = 70;
const MAX_DURATION = 134;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 100;

const titles = {
  'Побег из Шоушенка': 'The Shawshank Redemption',
  'Крестный отец': 'The Godfather',
  'Тёмный рыцарь': 'The Dark Knight',
  '12 Разгеванных мужчин': '12 Angry Men',
  'Список Шиндлера': 'Schindler\'s List'
}

const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1))
};

const getRandomPoster = () => POSTERS_PATH + POSTERS[getRandomInt(POSTERS.length - 1)];

const getRandomTitle = () => {
  const arr = Object.keys(titles);
  return arr[getRandomInt(arr.length - 1)];
}

const getRandonGenre = () => GENRES[getRandomInt(GENRES.length - 1)];

const getShortDescription = () => `${DESCRIPTION.substring(0, DESCRIPTION_SHORT_LENGTH)}...`;


export const generateFilmCard = () => {
  return {
    poster: getRandomPoster(),
    title: getRandomTitle(),
    raiting: getRandomInt(MIN_RATING, MAX_RATING),
    year: getRandomInt(MIN_YEAR, MAX_YEAR),
    duration: getRandomInt(MIN_DURATION, MAX_DURATION),
    genre: getRandonGenre(),
    descriptionShort: getShortDescription(),
    description: DESCRIPTION,
    commentsCount: getRandomInt(MIN_COMMENTS, MAX_COMMENTS),
    titleOriginal: ``,
    director: ``,
    screenwriters: ``,
    actors: ``,
    country: ``,
    ageRating: ``
  };
};
