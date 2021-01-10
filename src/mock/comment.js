import {nanoid} from "../vendor/nanoid";
import {MIN_MONTH, MAX_MONTH} from "../utils/constants";
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

const MAX_YEAR_COMMENT = 2020;
const MIN_YEAR_COMMENT = 2018;

const MAX_COMMENT_COUNT = 5;
const MIN_COMMENT_COUNT = 0;

let comments = [];

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

const getRandomCommentDate = (startYear, endYear) => getRandomDateInYearRange(startYear, endYear, MIN_MONTH, MAX_MONTH);

export const generateComment = () => {
  return {
    id: nanoid(4),
    author: getRandomAuthor(),
    comment: getRandomComment(),
    date: getRandomCommentDate(MIN_YEAR_COMMENT, MAX_YEAR_COMMENT),
    emotion: getRandomEmoji(),
  };
};

export const generateComments = () => {
  const commentsCount = getRandomIntInRange(MAX_COMMENT_COUNT, MIN_COMMENT_COUNT);
  return getArrayOfObjects(commentsCount, generateComment);
};

export const getCommentsIds = () => {
  const newlyGeneratedComments = generateComments();
  const newlyGeneratedCommentsIds = newlyGeneratedComments.map(({id}) => id);
  comments = comments.concat(newlyGeneratedComments);
  return newlyGeneratedCommentsIds;
};

export const getAllComments = () => comments;
