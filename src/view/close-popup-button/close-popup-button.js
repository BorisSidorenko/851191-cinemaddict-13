import AbstractView from "../abstract-component";
import {createClosePopupButtonTemaplte} from "../close-popup-button/close-popup-button-template";


export default class ClosePopupButton extends AbstractView {
  getTemplate() {
    return createClosePopupButtonTemaplte();
  }
}
