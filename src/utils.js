const KeyCode = {
  ESC_CODE: `Escape`
};

export const isEscEvent = (evt, action) => {
  if (evt.key === KeyCode.ESC_CODE) {
    action();
  }
};

