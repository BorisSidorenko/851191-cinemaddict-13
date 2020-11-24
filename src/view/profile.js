const Ranks = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIEBUFF: `Movie Buff`
};

const getRank = (fimlsCount) => {
  let rank = ``;

  if (fimlsCount > 0 && fimlsCount <= 10) {
    rank = Ranks.NOVICE;
  } else if (fimlsCount > 10 && fimlsCount <= 20) {
    rank = Ranks.FAN;
  } else if (fimlsCount > 20) {
    rank = Ranks.MOVIEBUFF;
  }

  return rank;
};

export const createProfileTemplate = (fimlsCount) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getRank(fimlsCount)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
