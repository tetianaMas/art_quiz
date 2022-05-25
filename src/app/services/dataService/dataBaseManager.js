import githubData from './githubData';

class DataBaseManager {
  constructor() {
    if (DataBaseManager.instance) {
      throw new Error('Instance already exists.');
    }
    DataBaseManager.instance = this;
    this.baseURL = githubData.address;
  }

  async get(link) {
    let res;
    try {
      const data = await fetch(this.baseURL + link);
      if (!data.ok) {
        throw new Error('No data!');
      }
      res = await data.json();
    } catch (err) {
      console.log(err);
    }

    return res;
  }
}

export default new DataBaseManager();
