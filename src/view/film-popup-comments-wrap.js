export const createFilmPopupCommentsWrap = (commentsCount) => {
  return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
  </section>`;
};
