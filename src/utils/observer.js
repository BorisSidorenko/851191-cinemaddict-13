export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  _notify(data) {
    this._observers.forEach((observer) => observer(data));
  }
}
