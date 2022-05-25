import localStorageManager from '../../services/dataService/localStorage';
import Utils from '../../services/Utils';
import Constants from '../../services/constants';

export default class SettingsPageModel {
  constructor() {
    this.data = Constants.defaultSettings;
    this.step = Constants.settingsStep;
    this.max = Constants.settingsMax;
    this.min = Constants.settingsMin;
  }

  getData() {
    const settings = localStorageManager.getValue('settings');
    if (settings) {
      this.data = settings;
    } else {
      this.saveData();
    }

    return this.data;
  }

  saveData() {
    localStorageManager.setValue('settings', this.data);
  }

  toggleVolume() {
    this.data.isVolume = !this.data.isVolume;
  }

  setVolumeVal(volume) {
    this.data.volume = volume;
  }

  getVolumeVal() {
    return this.data.volume;
  }

  toggleTimer() {
    this.data.isTimeGame = !this.data.isTimeGame;
  }

  increase(input, val) {
    const value = Utils.getNumberFromString(input.value);
    const newVal = value + this.step;
    if (newVal > this.max) {
      this.data[val] = value;
    } else {
      this.data[val] = newVal;
    }
  }

  decrease(input, val) {
    const value = Utils.getNumberFromString(input.value);
    const newVal = value - this.step;
    if (newVal < this.min) {
      this.data[val] = value;
    } else {
      this.data[val] = newVal;
    }
  }

  setDefaultSettings() {
    this.data = Constants.defaultSettings;
    this.saveData();
  }

  setLang(lang) {
    this.data.lang = lang;
  }
}
