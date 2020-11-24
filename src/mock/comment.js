import {getRandomIntInRange, getRandomDateInYearRange, getArrayOfObjects} from "../utils";
import dayjs from "dayjs";

const COMMENTS = [
  `Almost two hours? Seriously?`,
  `Very very old. Meh`,
  `Booooooooooring`,
  `Interesting setting and a good cast`,
  `Movie just for one time`
];

const EMOJI_PATH = `../../images/emoji/`;

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

const MAX_YEAR_COMMENT = 2020;
const MIN_YEAR_COMMENT = 2018;

const MAX_COMMENT_COUNT = 5;
const MIN_COMMENT_COUNT = 0;

const getRandomComment = () => COMMENTS[getRandomIntInRange(COMMENTS.length - 1)];

const getRandomEmoji = () => EMOJI_PATH + EMOJI[getRandomIntInRange(EMOJI.length - 1)];

const getRandomAuthor = () => AUTHORS[getRandomIntInRange(AUTHORS.length - 1)];

const getRandomCommentDate = (startYear, endYear) => {
  return dayjs(getRandomDateInYearRange(startYear, endYear)).format(`YYYY/MM/YY hh:mm`);
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

export const generateComments = ({id}) => getArrayOfObjects(getRandomIntInRange(MAX_COMMENT_COUNT, MIN_COMMENT_COUNT), generateComment(id));
