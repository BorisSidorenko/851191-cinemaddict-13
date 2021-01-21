export default class Store {
  constructor(key, storage) {
    this._key = key;
    this._storage = storage;
  }

  getItems() {
    const storageItem = JSON.parse(this._storage.getItem(this._key));
    return storageItem ? storageItem : {};
  }

  setItems(items) {
    this._storage.setItem(this._key, JSON.stringify(items));
  }

  setItem(key, value) {
    const storage = this.getItems();

    this._storage.setItem(
        this._key,
        JSON.stringify(
            Object.assign(
                {},
                storage,
                {
                  [key]: value
                }
            )
        )
    );
  }

  removeItem(key) {
    const storage = this.getItems();

    delete storage[key];

    this._storage.setItem(this._key, JSON.stringify(storage));
  }
}
