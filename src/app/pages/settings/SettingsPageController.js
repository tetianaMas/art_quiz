import eventBus from '../../services/eventBus';
import Utils from '../../services/Utils';
import soundStorage from './soundStorage';
import router from '../../routes';
import langManager from '../../services/lang/langManager';

export default class SettingsPageController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    eventBus.subscribe('settings-load', this.init.bind(this));
    eventBus.subscribe('play', (type) => this.playSound(type));
  }

  init() {
    const settings = this.model.getData();
    langManager.setLang(settings.lang);
    this.model.setLang(settings.lang);
    this.view.render(settings);
    this.view.changeVolumeBarBg(this.model.getVolumeVal());
    soundStorage.setVolume(settings.volume);
    if (settings.isVolume) {
      soundStorage.unMute();
    } else {
      soundStorage.mute();
    }

    this.initEvents();
  }

  initEvents() {
    const returnBtn = this.view.rootNode.querySelector('.return-btn-js');
    returnBtn.removeEventListener('click', router.return.bind(router));
    returnBtn.addEventListener('click', router.return.bind(router));

    this.view.settingsContainer.removeEventListener(
      'click',
      this.handleSettings.bind(this)
    );
    this.view.settingsContainer.addEventListener(
      'click',
      this.handleSettings.bind(this)
    );

    this.view.volumeBar.removeEventListener(
      'input',
      this.changeVolume.bind(this)
    );
    this.view.volumeBar.addEventListener('input', this.changeVolume.bind(this));
    this.view.controlsContainer.removeEventListener(
      'click',
      this.handleControls.bind(this)
    );
    this.view.controlsContainer.addEventListener(
      'click',
      this.handleControls.bind(this)
    );
  }

  handleSettings(e) {
    e.stopPropagation();
    if (e.target.classList.contains('btn-volume-js')) {
      this.handleSound(e.target);
    }

    if (e.target.classList.contains('btn-time-game-js')) {
      this.handleTimer(e.target);
    }

    if (e.target.classList.contains('answer-btn-plus-js')) {
      this.increase();
    }

    if (e.target.classList.contains('answer-btn-minus-js')) {
      this.decreaseTime();
    }
    if (e.target.classList.contains('quiz-btn-plus-js')) {
      this.increaseQuiz();
    }

    if (e.target.classList.contains('quiz-btn-minus-js')) {
      this.decreaseQuiz();
    }

    if (e.target.classList.contains('eng-js')) {
      langManager.setLang('eng');
      this.model.setLang('eng');
    }

    if (e.target.classList.contains('rus-js')) {
      langManager.setLang('rus');
      this.model.setLang('rus');
    }
  }

  handleControls(e) {
    e.stopPropagation();
    if (e.target.classList.contains('default-btn-js')) {
      this.setDefaultSettings();
    }

    if (e.target.classList.contains('save-btn-js')) {
      this.model.saveData();
      router.navigate('/main');
    }
  }

  setDefaultSettings() {
    this.model.setDefaultSettings();
    this.init();
  }

  increase() {
    this.model.increase(this.view.answerTime, 'timeToAnswer');
    this.view.renderTimeVal(this.model.data.timeToAnswer);
  }

  decrease() {
    this.model.decreaseTime(this.view.answerTime, 'timeToAnswer');
    this.view.renderTimeVal(this.model.data.timeToAnswer);
  }

  increaseQuiz() {
    this.model.increase(this.view.timeQuiz, 'quesInMiniQuiz');
    this.view.renderQuizVal(this.model.data.quesInMiniQuiz);
    eventBus.post('miniquiz-ques-amount', this.model.data.quesInMiniQuiz);
  }

  decreaseQuiz() {
    this.model.decrease(this.view.timeQuiz, 'quesInMiniQuiz');
    this.view.renderQuizVal(this.model.data.quesInMiniQuiz);
    eventBus.post('miniquiz-ques-amount', this.model.data.quesInMiniQuiz);
  }

  playSound(type) {
    if (this.model.getData().isVolume) {
      soundStorage.playAudio(type);
    }
  }

  handleSound(elem) {
    this.view.toggleBtn(elem);
    this.view.toggleVolumeProgress();
    this.model.toggleVolume();
    soundStorage.toggleVolume();
  }

  handleTimer(elem) {
    this.view.toggleBtn(elem);
    this.view.toggleTimerRange(elem);
    this.model.toggleTimer();
  }

  changeVolume() {
    const currentValue = Utils.getFloatFromString(this.view.volumeBar.value);
    if (currentValue <= 0) {
      soundStorage.mute();
      this.view.offBtn(this.view.soundBtn);
    } else {
      soundStorage.unMute();
      this.view.onBtn(this.view.soundBtn);
    }
    this.model.setVolumeVal(this.view.getVolumeVal());
    soundStorage.setVolume(currentValue);
    this.view.changeVolumeBarBg(currentValue);
  }
}
