import SmartView from "../smart";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getWatchedFilms, getWatchedFilmsGenresAndCount} from "../../utils/common";
import {createStatsTemplate} from "../stats/stats-template";
import {STATISTICS_BAR_HEIGHT, StatisticsPeriod} from "../../utils/constants";

const renderCharts = (statisticCtx, labels, data) => {
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;
    this._statsPeriod = StatisticsPeriod.ALL_TIME;
    this._statsPeriodChangeHandler = this._statsPeriodChangeHandler.bind(this);

    this._setCharts();
    this._setInnerHandlers();
  }

  getTemplate() {
    return createStatsTemplate(this._films, this._statsPeriod);
  }

  _setCharts() {
    const watchedFilms = getWatchedFilms(this._films);
    const watchedFilmsGenresAndCount = getWatchedFilmsGenresAndCount(watchedFilms);
    const labels = watchedFilmsGenresAndCount.map(([genre]) => genre);
    const data = watchedFilmsGenresAndCount.map(([, value]) => value);

    const statisticCtx = this.element.querySelector(`.statistic__chart`);
    statisticCtx.height = STATISTICS_BAR_HEIGHT * labels.length;

    renderCharts(statisticCtx, labels, data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setCharts();
  }

  _statsPeriodChangeHandler(evt) {
    evt.preventDefault();

    this._statsPeriod = evt.target.value;

    this.updateElement();
  }

  _setInnerHandlers() {
    this.element.querySelector(`.statistic__filters`).addEventListener(`change`, this._statsPeriodChangeHandler);
  }
}
