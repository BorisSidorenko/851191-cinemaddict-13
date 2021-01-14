import FilmsModel from "../src/model/films";
import {Method, Url} from "../src/utils/constants";

export default class Api {
  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;
  }

  getFilms() {
    return this._load({url: Url.FILMS})
      .then((response) => response.json())
      .then((films) => films.map(FilmsModel.adaptFilmToClient));
  }

  getFilmComments({id}) {
    return this._load({url: `${Url.COMMENTS}/${id}`})
      .then((response) => response.json())
      .then((comments) => comments);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._auth);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(this._checkResponseStatus)
      .catch(this._catchError);
  }

  _checkResponseStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  _catchError(error) {
    throw error;
  }
}
