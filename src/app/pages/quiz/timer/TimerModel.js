import localStorage from '../../../services/dataService/localStorage';

export default class TimerModel {
  constructor() {
    this.ls = localStorage;
    this.settings = null;
    this.currentTime = null;
  }

  getSettings() {
    this.settings = this.ls.getValue('settings');
    if (this.settings) {
      this.currentTime = this.settings.timeToAnswer;
    }

    return this.settings;
  }

  setCurrentTime(time) {
    if (time) {
      this.currentTime = time;
    }
  }

  getCurrentTime() {
    return this.currentTime;
  }

  decreaseCurrentTime() {
    this.currentTime -= 1;
  }
}
