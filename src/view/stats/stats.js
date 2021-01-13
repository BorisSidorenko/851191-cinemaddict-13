import SmartView from "../smart";
import dayjs from "dayjs";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getWatchedFilms, getWatchedFilmsGenresAndCount, getRank} from "../../utils/common";
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

const getWatchedFilmsForPeriod = (watchedFilms, period) => {
  let watchedFilmsForPeriod = watchedFilms;

  if (period !== StatisticsPeriod.ALL_TIME) {
    const periodToShow = period === StatisticsPeriod.TODAY ? StatisticsPeriod.DAY : period;
    const now = dayjs();
    const startPeriod = now.subtract(1, periodToShow);

    watchedFilmsForPeriod = watchedFilms.filter(({userDetails}) => {
      const watchDate = dayjs(userDetails.watchingDate);
      return watchDate.isAfter(startPeriod) && watchDate.isBefore(now);
    });
  }

  return watchedFilmsForPeriod;
};


export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films;
    this._statsPeriod = StatisticsPeriod.ALL_TIME;
    this._statsPeriodChangeHandler = this._statsPeriodChangeHandler.bind(this);
    this._watchedFilmsForPeriod = null;
    this._watchedFilms = null;
    this._rank = null;

    this._setCharts();
    this._setInnerHandlers();
  }

  getTemplate() {
    return createStatsTemplate(this._watchedFilms, this._statsPeriod, this._rank);
  }

  _setCharts() {
    this._watchedFilms = getWatchedFilms(this._films);
    this._rank = getRank(this._watchedFilms);
    this._watchedFilmsForPeriod = getWatchedFilmsForPeriod(this._watchedFilms, this._statsPeriod);
    const watchedFilmsGenresAndCount = getWatchedFilmsGenresAndCount(this._watchedFilmsForPeriod);
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
    this._watchedFilms = getWatchedFilmsForPeriod(this._watchedFilms, this._statsPeriod);

    this.updateElement();
  }

  _setInnerHandlers() {
    this.element.querySelector(`.statistic__filters`).addEventListener(`change`, this._statsPeriodChangeHandler);
  }
}
