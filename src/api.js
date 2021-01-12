import {Method, Url} from "../src/utils/constants";

export default class Api {
  constructor(endPoint, auth) {
    this._endPoint = endPoint;
    this._auth = auth;

    this._adaptFilmToClient = this._adaptFilmToClient.bind(this);
  }

  getFilms() {
    return this._load({url: Url.FILMS})
      .then((response) => response.json())
      .then((films) => films.map(this._adaptFilmToClient));
  }

  _adaptFilmToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          filmInfo: this._adaptFilmInfoToClient(film.film_info)
        },
        {
          userDetails: this._adaptUserDetailsToClient(film.user_details)
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  _adaptFilmInfoToClient(filmInfo) {
    const adaptedFilmInfo = Object.assign(
        {},
        filmInfo,
        {
          ageRating: filmInfo.age_rating,
          alternativeTitle: filmInfo.alternative_title,
          totalRating: filmInfo.total_rating
        }
    );

    delete adaptedFilmInfo.age_rating;
    delete adaptedFilmInfo.alternative_title;
    delete adaptedFilmInfo.total_rating;

    return adaptedFilmInfo;
  }

  _adaptUserDetailsToClient(userDetails) {
    const adaptedUserDetails = Object.assign(
        {},
        userDetails,
        {
          alreadyWatched: userDetails.already_watched,
          watchingDate: userDetails.watching_date
        }
    );

    delete adaptedUserDetails.already_watched;
    delete adaptedUserDetails.watching_date;

    return adaptedUserDetails;
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
