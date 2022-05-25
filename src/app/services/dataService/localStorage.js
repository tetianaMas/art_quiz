class LocalStorage {
  constructor() {
    this.prefix = 'tetianaMas-Art-Quiz-';
  }

  setValue(key, value) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  getValue(key) {
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }
}

export default new LocalStorage();
