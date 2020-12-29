import he from "he";
import {EMOJI_PATH, EMOJI_EXTENSION} from "../../utils/constants";

const getCommentElement = ({id, text, emoji, author, date}) => {
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${EMOJI_PATH}${emoji}${EMOJI_EXTENSION}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(text)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" data-id-comment="${id}">Delete</button>
      </p>
    </div>
  </li>`;
};

const createCommentElements = (comments) => {
  return comments.map(getCommentElement).join(``);
};

export const createFilmPopupCommentsListTemplate = (comments) => {
  return `<ul class="film-details__comments-list">
    ${createCommentElements(comments)}
  </ul>`;
};
