export const generateFilmPopupPoster = ({ageRating}) => {
  return `<div class="film-details__poster">
    <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">
    <p class="film-details__age">${ageRating}</p>
  </div>`;
};
