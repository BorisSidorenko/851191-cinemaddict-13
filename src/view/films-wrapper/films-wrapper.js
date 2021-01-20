import AbstractView from "../abstract-component";
import {createFilmsWrapperTemplate} from "./films-wrapper-template";

export default class FilmsWrapper extends AbstractView {
  getTemplate() {
    return createFilmsWrapperTemplate();
  }
}
