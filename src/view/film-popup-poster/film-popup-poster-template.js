export const createFilmPopupPoster = (poster, ageRating) => {
  return `<div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">
    <p class="film-details__age">${ageRating}</p>
  </div>`;
};
