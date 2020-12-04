import AbstractView from "../abstract-component";
import {createClosePopupButtonWrapperTemaplte} from "../close-popup-button-wrapper/close-popup-button-wrapper-template";

export default class ClosePopupButtonWrapper extends AbstractView {
  getTemplate() {
    return createClosePopupButtonWrapperTemaplte();
  }
}
