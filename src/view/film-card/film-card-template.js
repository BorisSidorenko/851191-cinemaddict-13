import dayjs from "dayjs";
import {convertDurationIntoHours, getShortDescription} from "../../utils/common";

export const createFilmCardTemplate = ({id, film_info: filmInfo, user_details: userDetails}, commentsCount) => {
  const {title, total_rating: totalRating, release, runtime, genre, poster, description} = filmInfo;
  const [firstGenre] = genre;
  const {already_watched: alreadyWatched, watchlist, favorite} = userDetails;
  const {date} = release;
  const releaseYear = dayjs(date).year();

  return `<article class="film-card" data-id=${id}>
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${convertDurationIntoHours(runtime)}</span>
        <span class="film-card__genre">${firstGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? `film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};
