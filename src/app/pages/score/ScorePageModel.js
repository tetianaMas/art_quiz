import localStorage from '../../services/dataService/localStorage';

export default class ScorePageModel {
  constructor() {
    this.ls = localStorage;
  }

  getData() {
    const data = this.ls.getValue('categories');
    if (!data) {
      return '';
    }

    return data;
  }
}
