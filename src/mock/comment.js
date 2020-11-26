import {getRandomIntInRange, getRandomDateInYearRange, getArrayOfObjects} from "../utils";
import dayjs from "dayjs";

const COMMENTS = [
  `Almost two hours? Seriously?`,
  `Very very old. Meh`,
  `Booooooooooring`,
  `Interesting setting and a good cast`,
  `Movie just for one time`
];

const EMOJI_PATH = `././images/emoji/`;

const EMOJI = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const AUTHORS = [
  `Alex Du`,
  `Kira Night`,
  `Eddi Broke`,
  `Sofia Len`,
  `Kurt Bul`,
  `Liam Phill`
];

const RELEASE_DATE_FORMAT = `YYYY/MM/YY hh:mm`;

const MAX_YEAR_COMMENT = 2020;
const MIN_YEAR_COMMENT = 2018;

const MAX_COMMENT_COUNT = 5;
const MIN_COMMENT_COUNT = 0;

const getRandomComment = () => {
  const commentIndex = getRandomIntInRange(COMMENTS.length - 1);
  return COMMENTS[commentIndex];
}

const getRandomEmoji = () => {
  const getEmojiIndex = getRandomIntInRange(EMOJI.length - 1);
  return `${EMOJI_PATH}${EMOJI[getEmojiIndex]}`;
}

const getRandomAuthor = () => {
  const authorIndex = getRandomIntInRange(AUTHORS.length - 1);
  return AUTHORS[authorIndex];
}

const getRandomCommentDate = (startYear, endYear) => {
  return dayjs(getRandomDateInYearRange(startYear, endYear)).format(RELEASE_DATE_FORMAT);
};

export const generateComment = (id) => () => {
  return {
    filmId: id,
    text: getRandomComment(),
    emoji: getRandomEmoji(),
    author: getRandomAuthor(),
    date: getRandomCommentDate(MIN_YEAR_COMMENT, MAX_YEAR_COMMENT)
  };
};

export const generateComments = (id) => {
  const commentsCount = getRandomIntInRange(MAX_COMMENT_COUNT, MIN_COMMENT_COUNT);
  return getArrayOfObjects(commentsCount, generateComment(id));
}
