const generateGenresTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
};

export const generateFilmPopupInfoTemplate = ({title, titleOriginal, rating, director, screenwriters, actors, releaseDate, duration, country, genres, description}) => {
  return `<div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${titleOriginal}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${rating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${screenwriters}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${releaseDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${duration}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${country}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">${generateGenresTemplate(genres)}</td>
      </tr>
    </table>

    <p class="film-details__film-description">
      ${description}
    </p>
  </div>`;
};
