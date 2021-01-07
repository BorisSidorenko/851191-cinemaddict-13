import SmartView from "../smart";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createStatsTemplate} from "../stats/stats-template";

export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatsTemplate(this._films);
  }
}
