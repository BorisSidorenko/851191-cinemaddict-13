import {MINUTES_IN_HOUR, StatisticsPeriod} from "../../utils/constants";
import {getWatchedFilms, getFilmsDuration, getWatchedFilmsGenresAndCount} from "../../utils/common";

const getTotalDurationHours = (totalDuration) => Math.floor(totalDuration / MINUTES_IN_HOUR);

const getTotalDurationMinutes = (totalDuration) => totalDuration % MINUTES_IN_HOUR;

export const createStatsTemplate = (films, currentPeriod, rank) => {
  let topWatchedGenreAndCount = [];
  let topGenre = ``;

  const watchedFilms = getWatchedFilms(films);
  const totalDuration = getFilmsDuration(watchedFilms);

  const watchedGenresAndCount = getWatchedFilmsGenresAndCount(watchedFilms);

  if (watchedGenresAndCount.length > 0) {
    [topWatchedGenreAndCount] = watchedGenresAndCount;
    [topGenre] = topWatchedGenreAndCount;
  }

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${currentPeriod === StatisticsPeriod.ALL_TIME ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentPeriod === StatisticsPeriod.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentPeriod === StatisticsPeriod.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentPeriod === StatisticsPeriod.MONTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentPeriod === StatisticsPeriod.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getTotalDurationHours(totalDuration)} <span class="statistic__item-description">h</span> ${getTotalDurationMinutes(totalDuration)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
};
