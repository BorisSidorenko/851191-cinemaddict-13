const TIME_TO_SHOW_TOAST = 5000;
const TOAST_CONTAINER = `toast-container`;
const TOAST_ITEM = `toast-item`;

const createToastContainer = () => {
  const lastBodyElement = document.body.lastChild;

  if (lastBodyElement.classList && lastBodyElement.classList.contains(TOAST_CONTAINER)) {
    lastBodyElement.remove();
  }

  const container = document.createElement(`div`);
  container.classList.add(TOAST_CONTAINER);
  document.body.append(container);

  return container;
};

export const toast = (message, toastType) => {
  const container = createToastContainer();
  const item = document.createElement(`div`);

  item.textContent = message;
  item.classList.add(TOAST_ITEM, toastType);

  container.append(item);

  setTimeout(() => {
    container.remove();
  }, TIME_TO_SHOW_TOAST);
};
