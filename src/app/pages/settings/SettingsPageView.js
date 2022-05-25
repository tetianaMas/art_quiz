import footer from '../../components/footer';
import header from '../../components/header';
import main from './template';
import Utils from '../../services/Utils';
import langManager from '../../services/lang/langManager';
import Constants from '../../services/constants';

export default class SettingsPageView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.mainNode = this.rootNode.querySelector('.main-js .container');
    this.footerNode = this.rootNode.querySelector('.page-controls-js');
    this.footerTemplate = footer;
    this.headerTemplate = header;
    this.mainTemplate = main;
    this.volumeBar = null;
    this.soundBtn = null;
    this.timeGameBtn = null;
    this.answerTime = null;
    this.lang = langManager;
  }

  render(settings) {
    const headerLayout = this.getHeaderLayout();
    const mainLayout = this.getMainLayout(settings);
    Utils.resetAppClass(this.rootNode, 'app settings');
    const oldNav = this.footerNode.querySelector('.nav');
    if (oldNav) {
      oldNav.remove();
    }

    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';
    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.mainNode.insertAdjacentHTML('beforeend', mainLayout);
    this.setNodes();
  }

  getHeaderLayout() {
    return this.headerTemplate(this.lang.getLang().settings.title);
  }

  getMainLayout(settings) {
    return this.mainTemplate(settings);
  }

  setNodes() {
    this.settingsContainer = this.rootNode.querySelector('.settings-list-js');
    this.volumeBar = this.settingsContainer.querySelector(
      '.volume-progress-js'
    );
    this.soundBtn = this.settingsContainer.querySelector('.btn-volume-js');
    this.timeGameBtn =
      this.settingsContainer.querySelector('.btn-time-game-js');
    this.answerTime =
      this.settingsContainer.querySelector('.time-to-answer-js');
    this.timeIncrease =
      this.settingsContainer.querySelector('.answer-btn-plus');
    this.timeDecrease =
      this.settingsContainer.querySelector('.answer-btn-minus');
    this.controlsContainer = this.rootNode.querySelector(
      '.settings-controls-js'
    );
    this.timeQuiz = this.rootNode.querySelector('.time-quiz-js');
  }

  changeVolumeBarBg(value) {
    this.volumeBar.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${
      value * Constants.fullPercents
    }%, #a4a4a4 ${value * Constants.fullPercents}%, #a4a4a4 100%)`;
  }

  toggleBtn(btn) {
    if (btn.classList.contains('toggle-btn-active')) {
      this.offBtn(btn);
    } else {
      this.onBtn(btn);
    }
  }

  onBtn(btn) {
    this.button = btn;
    this.button.classList.add('toggle-btn-active');
    this.button.previousElementSibling.textContent =
      this.lang.getLang().settings.on;
  }

  offBtn(btn) {
    this.button = btn;
    this.button.classList.remove('toggle-btn-active');
    this.button.previousElementSibling.textContent =
      this.lang.getLang().settings.off;
  }

  toggleVolumeProgress() {
    if (this.soundBtn.classList.contains('toggle-btn-active')) {
      this.volumeBar.removeAttribute('disabled');
    } else {
      this.volumeBar.setAttribute('disabled', '');
    }
  }

  getVolumeVal() {
    return this.volumeBar.value;
  }

  toggleTimerRange(btn) {
    if (btn.classList.contains('toggle-btn-active')) {
      this.timeIncrease.removeAttribute('disabled');
      this.timeDecrease.removeAttribute('disabled');
    } else {
      this.timeIncrease.setAttribute('disabled', '');
      this.timeDecrease.setAttribute('disabled', '');
    }
  }

  renderTimeVal(value) {
    this.answerTime.value = value;
  }

  renderQuizVal(value) {
    this.timeQuiz.value = value;
  }
}
