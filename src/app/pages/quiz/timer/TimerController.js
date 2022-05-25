import eventBus from '../../../services/eventBus';
import Utils from '../../../services/Utils';
import Constants from '../../../services/constants';

export default class TimerController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.timerId = null;
    this.timeToIncrease = Constants.timeToIncreaseInTimer;
    this.totalTime = Constants.totalTimeInTimer;
    eventBus.subscribe('timer', this.initTimer.bind(this));
    eventBus.subscribe('timer-stop', this.stopTimer.bind(this));
    eventBus.subscribe('timer-mini-quiz', this.initMiniQuizTimer.bind(this));
    eventBus.subscribe('timer-mini-quiz-answer', (isRightAnswer) =>
      this.handleTimerAnswer(isRightAnswer)
    );
  }

  initTimer() {
    const timerSettings = this.model.getSettings();
    if (timerSettings && timerSettings.isTimeGame) {
      this.totalTime = timerSettings.timeToAnswer;
      this.view.render(timerSettings);
      this.view.initProgressBar();
      this.startTimer(() => eventBus.post('timer-expired'));
    }
  }

  initMiniQuizTimer() {
    this.totalTime = Constants.totalTimeInTimer;
    const settings = { timeToAnswer: this.totalTime };
    this.model.setCurrentTime(this.totalTime);
    this.view.render(settings);
    this.view.initProgressBar();
    this.startTimer(() => eventBus.post('timer-mini-quiz-expired'));
  }

  handleTimerAnswer(isRightAnswer) {
    if (!isRightAnswer) {
      return;
    }
    this.stopTimer();
    let currTime = this.model.getCurrentTime();
    currTime += this.timeToIncrease;
    if (currTime > this.totalTime) {
      currTime = this.totalTime;
    }
    this.model.setCurrentTime(currTime);
    this.startTimer(() => eventBus.post('timer-mini-quiz-expired'));
  }

  startTimer(cb) {
    const currentTime = this.model.getCurrentTime();
    this.view.updateTime(currentTime);
    this.view.updateProgressBar(currentTime, this.totalTime);
    this.model.decreaseCurrentTime();
    if (currentTime === 0) {
      this.stopTimer();
      cb();
      return;
    }
    this.timerId = Utils.timeUpdate(() => this.startTimer(cb));
  }

  stopTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.view.stopProgressBar();
    }
  }
}
