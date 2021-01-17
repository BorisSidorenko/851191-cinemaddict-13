const getEmoji = (emoji) => {
  return emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ``;
};

export const createFilmPopupNewCommentTemplate = ({text, emoji}, isSubmitDisabled = false) => {
  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">${getEmoji(emoji)}</div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isSubmitDisabled ? `disabled` : ``}>${text ? text : ``}</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile"  ${isSubmitDisabled ? `disabled` : ``} ${emoji === `smile` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isSubmitDisabled ? `disabled` : ``} ${emoji === `sleeping` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isSubmitDisabled ? `disabled` : ``} ${emoji === `puke` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isSubmitDisabled ? `disabled` : ``} ${emoji === `angry` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`;
};
