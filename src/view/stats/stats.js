import AbstractView from "../abstract-component";
import {createStatsTemplate} from "../stats/stats-template";

export default class Stats extends AbstractView {
  getTemplate() {
    return createStatsTemplate();
  }
}
