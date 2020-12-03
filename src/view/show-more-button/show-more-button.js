import AbstractView from "../abstract-component";
import {createShowMoreButtonTemplate} from "../show-more-button/show-more-button-template";

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
