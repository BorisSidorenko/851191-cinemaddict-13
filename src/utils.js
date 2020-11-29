import dayjs from "dayjs";

const KeyCode = {
  ESC_CODE: `Escape`
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
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

export const renderElement = (container, element, place = RenderPosition.BEFOREEND) => place === RenderPosition.BEFOREEND ? container.append(element) : container.prepend(element);

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getArrayOfObjects = (count, cb) => Array(count).fill().map(() => cb());
