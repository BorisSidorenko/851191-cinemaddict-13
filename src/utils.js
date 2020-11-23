const KeyCode = {
  ESC_CODE: `Escape`
};

export const isEscEvent = (evt, action) => {
  if (evt.key === KeyCode.ESC_CODE) {
    action();
  }
};

export const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
