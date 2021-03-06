import AbstractView from "../view/abstract-component";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  if (container instanceof AbstractView) {
    container = container.element;
  }

  if (component instanceof AbstractView) {
    component = component.element;
  }

  if (place === RenderPosition.BEFOREEND) {
    container.append(component);
  } else {
    container.prepend(component);
  }
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components.`);
  }

  component.element.remove();
  component.removeElement();
};

export const createElement = (template, element = `div`) => {
  const node = document.createElement(element);
  node.innerHTML = template;
  return node.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.element;
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.element;
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};
