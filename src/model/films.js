import Observer from "../utils/observer";
import clonedeep from "lodash.clonedeep";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
    this.updateFilm = this.updateFilm.bind(this);
  }

  set films(films) {
    this._films = films.slice();
  }

  get films() {
    return clonedeep(this._films);
  }

  updateFilm(filmToUpdate) {
    const updatedFilms = this._films.map((film) => film.id === filmToUpdate.id ? filmToUpdate : film);
    this._films = updatedFilms;

    this._notify(filmToUpdate);
  }

  static adaptFilmToServer(film) {
    const {filmInfo, userDetails} = film;

    const adaptedRelease = Object.assign(
        {},
        filmInfo.release,
        {
          "release_country": filmInfo.release.releaseCountry
        }
    );

    delete adaptedRelease.releaseCountry;

    const adaptedFilmInfo = Object.assign(
        {},
        filmInfo,
        {
          "age_rating": filmInfo.ageRating,
          "alternative_title": filmInfo.alternativeTitle,
          "total_rating": filmInfo.totalRating,
          "release": adaptedRelease
        }
    );

    delete adaptedFilmInfo.ageRating;
    delete adaptedFilmInfo.alternativeTitle;
    delete adaptedFilmInfo.totalRating;

    const adaptedUserDetails = Object.assign(
        {},
        userDetails,
        {
          "already_watched": userDetails.alreadyWatched,
          "watching_date": userDetails.watchingDate
        }
    );

    delete adaptedUserDetails.alreadyWatched;
    delete adaptedUserDetails.watchingDate;

    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "film_info": adaptedFilmInfo
        },
        {
          "user_details": adaptedUserDetails
        }
    );

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }

  static adaptFilmToClient(film) {
    const filmInfo = film.film_info;
    const userDetails = film.user_details;

    const adaptedRelease = Object.assign(
        {},
        filmInfo.release,
        {
          releaseCountry: filmInfo.release.release_country
        }
    );

    delete adaptedRelease.release_country;

    const adaptedFilmInfo = Object.assign(
        {},
        filmInfo,
        {
          ageRating: filmInfo.age_rating,
          alternativeTitle: filmInfo.alternative_title,
          totalRating: filmInfo.total_rating,
          release: adaptedRelease
        }
    );

    delete adaptedFilmInfo.age_rating;
    delete adaptedFilmInfo.alternative_title;
    delete adaptedFilmInfo.total_rating;

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

    const adaptedFilm = Object.assign(
        {},
        film,
        {
          filmInfo: adaptedFilmInfo
        },
        {
          userDetails: adaptedUserDetails
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }
}
