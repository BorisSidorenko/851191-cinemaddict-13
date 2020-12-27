import SiteFilterView from "../view/site-menu/site-menu";
import {render, RenderPosition} from "../utils/render";
import {FilterType} from "../utils/constants";

export default class Filter {
  constructor(mainContainer, filmsModel, filterModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._handleFilterChange = this._handleFilterChange.bind(this);
  }

  init() {
    this._render();
  }

  _render() {
    const filterComponent = new SiteFilterView(this._filterModel.filter, this._filmsModel.allFilms);
    filterComponent.setFilterChangeHandler(this._handleFilterChange);
    render(this._mainContainer, filterComponent, RenderPosition.AFTERBEGIN);
  }

  _handleFilterChange(evt) {
    const hrefValue = evt.target.getAttribute(`href`);

    const clickedFilterType = hrefValue ? hrefValue : evt.target.parentNode.getAttribute(`href`);

    const newFilter = Object.values(FilterType).find((type) => clickedFilterType.includes(type));

    this._filterModel.filter = newFilter;
  }
}
