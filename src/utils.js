const KeyCode = {
  ESC_CODE: `Escape`
};

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

export const getRandomDateInYearRange = (startYear, endYear) => {
  const date = new Date(new Date(startYear, 0, 1).getTime() + Math.random() * (new Date(endYear, 0, 1).getTime() - new Date(startYear, 0, 1).getTime()));
  return date;
};


export const getArrayOfObjects = (count, cb) => Array(count).fill().map(() => cb());
