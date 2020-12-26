import SiteFilterView from "../view/site-menu/site-menu";
import {render, RenderPosition} from "../utils/render";

export default class Filter {
  constructor(mainContainer, filmsModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
  }

  init() {
    this._render();
  }

  _render() {
    const filterComponent = new SiteFilterView(this._filmsModel.allFilms);
    render(this._mainContainer, filterComponent, RenderPosition.AFTERBEGIN);
  }

}
