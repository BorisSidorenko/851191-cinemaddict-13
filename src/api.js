import {Method, Url, SuccessHTTPStatus} from "../src/utils/constants";

export default class Api {
  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;
  }

  getFilms() {
    return this._load({url: Url.FILMS})
      .then((response) => response.json());
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
    const status = response.status;

    if (status < SuccessHTTPStatus.MIN || status > SuccessHTTPStatus.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  _catchError(error) {
    throw error;
  }
}
