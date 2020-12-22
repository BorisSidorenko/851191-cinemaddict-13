import {SortType} from "../../utils/constants";

export const createSortTemplate = (sortType) => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button ${sortType === SortType.DEFAULT ? `sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}" >Sort by default</a></li>
    <li><a href="#" class="sort__button ${sortType === SortType.DATE ? `sort__button--active` : ``}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sortType === SortType.RATING ? `sort__button--active` : ``}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};
