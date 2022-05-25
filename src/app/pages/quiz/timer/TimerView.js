import timerTemplate from './template';
import Constants from '../../../services/constants';

export default class TimerView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerContainer = this.rootNode;
    this.timerTemplate = timerTemplate;
  }

  render(settings) {
    const layout = this.timerTemplate(settings);
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.headerNode.insertAdjacentHTML('beforeend', layout);
    this.timerContainer = this.headerNode.querySelector('.current-time-js');
    this.progressBar = this.headerNode.querySelector('.timer-progress-js');
  }

  updateTime(time) {
    const TIME_IN_MIN = Constants.totalTimeInTimer;
    const minutes = Math.floor(time / TIME_IN_MIN);
    const sec = Math.floor(time % TIME_IN_MIN);
    this.timerContainer.textContent = `${minutes || '00'}:${
      sec < Constants.maxTimeToAnswer ? '0' + sec : sec
    }`;
  }

  updateProgressBar(currTime, totalTime) {
    const full = this.rootNode.querySelector('.bottom-bg').clientWidth;
    const width = (currTime * full) / totalTime;

    this.progressBar.style = `width: ${width}px`;
  }

  initProgressBar() {
    this.progressBar.classList.add('animate-progress');
  }

  stopProgressBar() {
    this.progressBar.style.animationPlayState = 'paused';
  }
}
