import Constants from '../../../../services/constants';

export default function timer(settings) {
  return `
    <div class="progress-wrapper progress-wrapper-js">
      <div class="timer-progress animate-progress timer-progress-js">
      </div>
      <div class="bottom-bg"></div>
    </div>
    <p class="current-time current-time-js">00:${
      settings.timeToAnswer < Constants.maxTimeToAnswer
        ? '0' + settings.timeToAnswer
        : settings.timeToAnswer
    }</p>`;
}
