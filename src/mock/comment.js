import {nanoid} from "../vendor/nanoid";
import {getRandomIntInRange, getRandomInt, getRandomDateInYearRange, getArrayOfObjects} from "../utils/common";

const COMMENTS = [
  `Almost two hours? Seriously?`,
  `Very very old. Meh`,
  `Booooooooooring`,
  `Interesting setting and a good cast`,
  `Movie just for one time`
];

const EMOJI = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`
];

const AUTHORS = [
  `Alex Du`,
  `Kira Night`,
  `Eddi Broke`,
  `Sofia Len`,
  `Kurt Bul`,
  `Liam Phill`
];

const COMMENT_DATE_FORMAT = `YYYY/MM/DD hh:mm`;

const MAX_YEAR_COMMENT = 2020;
const MIN_YEAR_COMMENT = 2018;

const MAX_COMMENT_COUNT = 5;
const MIN_COMMENT_COUNT = 0;

const getRandomComment = () => {
  const commentIndex = getRandomInt(COMMENTS.length);
  return COMMENTS[commentIndex];
};

const getRandomEmoji = () => {
  const getEmojiIndex = getRandomInt(EMOJI.length);
  return `${EMOJI[getEmojiIndex]}`;
};

const getRandomAuthor = () => {
  const authorIndex = getRandomInt(AUTHORS.length);
  return AUTHORS[authorIndex];
};

const getRandomCommentDate = (startYear, endYear) => getRandomDateInYearRange(startYear, endYear, COMMENT_DATE_FORMAT);

export const generateComment = (id) => () => {
  return {
    filmId: id,
    id: nanoid(4),
    text: getRandomComment(),
    emoji: getRandomEmoji(),
    author: getRandomAuthor(),
    date: getRandomCommentDate(MIN_YEAR_COMMENT, MAX_YEAR_COMMENT)
  };
};

export const generateComments = (id) => {
  const commentsCount = getRandomIntInRange(MAX_COMMENT_COUNT, MIN_COMMENT_COUNT);
  return getArrayOfObjects(commentsCount, generateComment(id));
};
