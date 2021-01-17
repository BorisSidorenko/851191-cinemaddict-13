import {Method, Url, Header} from "../src/utils/constants";

export default class Api {
  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;
  }

  getFilms() {
    return this._load({url: Url.FILMS})
      .then((response) => response.json());
  }

  updateFilm(film) {
    return this._load({
      url: `${Url.FILMS}/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(film),
      headers: new Headers({[Header.CONTENT_TYPE]: `application/json`})
    })
      .then((response) => response.json());
  }

  getFilmComments(id) {
    return this._load({url: `${Url.COMMENTS}/${id}`})
      .then((response) => response.json());
  }

  deleteComment(id) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(Header.AUTHORIZATION, this._auth);

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
