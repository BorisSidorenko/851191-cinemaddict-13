import SiteFilterView from "../view/site-menu/site-menu";
import {render, RenderPosition} from "../utils/render";
import {FilterType} from "../utils/constants";
import {remove} from "../utils/render";

export default class Filter {
  constructor(mainContainer, filmsModel, filterModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filterComponent = null;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._render = this._render.bind(this);
    this._filmsModel.addObserver(this._render);
  }

  init() {
    this._render();
  }

  _render() {
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new SiteFilterView(this._filterModel.filter, this._filmsModel.allFilms);
    this._filterComponent.setFilterChangeHandler(this._handleFilterChange);

    if (prevFilterComponent !== null) {
      remove(prevFilterComponent);
    }

    render(this._mainContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _handleFilterChange(evt) {
    const hrefValue = evt.target.getAttribute(`href`);

    const clickedFilterType = hrefValue ? hrefValue : evt.target.parentNode.getAttribute(`href`);

    const newFilter = Object.values(FilterType).find((type) => clickedFilterType.includes(type));

    this._filterModel.filter = newFilter;

    this._render();
  }
}
