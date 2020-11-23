const generateComments = (comments) => {
  return comments.map(({text, emoji, author, date}) => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`).join(``);
};

export const generateFilmPopupCommentsList = (comments) => {
  return `<ul class="film-details__comments-list">
    ${generateComments(comments)}
  </ul>`;
};
