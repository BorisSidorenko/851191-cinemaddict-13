const FONTS_PATH = `./fonts/`;
const EMOJI_PATH = `./images/emoji/`;
const CSS_PATH = `./css/`;
const ICON_PATH = `./images/icons/`;
const POSTERS_PATH = `./images/posters/`;
const REST_IMAGES_PATH = `./images/`;

const REST_IMAGES_NAMES = [
  `background.png`,
  `bitmap.png`,
  `bitmap@2x.png`,
  `bitmap@3x.png`
];

const ICON_NAMES = [
  `icon-favorite-active.svg`,
  `icon-favorite.svg`,
  `icon-watched-active.svg`,
  `icon-watched.svg`,
  `icon-watchlist-active.svg`,
  `icon-watchlist.svg`
];

const EMOJI_NAMES = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const FONTS_NAMES = [
  `OpenSans-Bold.woff2`,
  `OpenSans-ExtraBold.woff2`,
  `OpenSans-Regular.woff2`
];

const CSS_NAMES = [
  `normalize.css`,
  `main.css`
];

const POSTER_NAMES = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const CACHE_PREFIX = `cinemaddict-cache`;
const CACHE_VER = `v13`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const RESPONSE_SAFE_TYPE = `basic`;

const getFilesWithPath = (names, path) => names.map((name) => `${path}${name}`);

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `./`,
          `./index.html`,
          `./bundle.js`,
          ...getFilesWithPath(CSS_NAMES, CSS_PATH),
          ...getFilesWithPath(FONTS_NAMES, FONTS_PATH),
          ...getFilesWithPath(EMOJI_NAMES, EMOJI_PATH),
          ...getFilesWithPath(ICON_NAMES, ICON_PATH),
          ...getFilesWithPath(POSTER_NAMES, POSTERS_PATH),
          ...getFilesWithPath(REST_IMAGES_NAMES, REST_IMAGES_PATH)
        ]);
      })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
    caches.keys((keys) => {
      return Promise.all([
        keys.map((key) => {
          if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ]);
    })
  );
});

const fetchHandler = (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(evt.request)
          .then((response) => {
            if (!response || !response.ok || response.type !== RESPONSE_SAFE_TYPE) {
              return response;
            }

            const clonedResponse = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => cache.put(evt.request, clonedResponse));

            return response;
          })
      })
  );
};

self.addEventListener(`fetch`, fetchHandler);
