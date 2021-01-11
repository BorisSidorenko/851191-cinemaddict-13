import dayjs from "dayjs";
import {convertDurationIntoHours} from "../../utils/common";
import {RELEASE_DATE_FORMAT} from "../../utils/constants";

const getGengresTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const createGenresTemplate = (genres) => {
  return genres.map(getGengresTemplate).join(``);
};

export const createFilmPopupInfoTemplate = ({filmInfo}) => {
  const {title, alternativeTitle, totalRating, director, writers, actors, release, runtime, genre, description} = filmInfo;
  const {date, releaseCountry} = release;
  const releaseDate = dayjs(date).format(RELEASE_DATE_FORMAT);

  return `<div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${alternativeTitle}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${totalRating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers.join(`, `)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors.join(`, `)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${releaseDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${convertDurationIntoHours(runtime)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">${createGenresTemplate(genre)}</td>
      </tr>
    </table>

    <p class="film-details__film-description">
      ${description}
    </p>
  </div>`;
};
