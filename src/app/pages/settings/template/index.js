import langManager from '../../../services/lang/langManager';

export default function main(settings) {
  const LANG = langManager.getLang().settings;
  return `
          <ul class="settings-list settings-list-js">
            <li class="settings-item volume-item-js">
              <h2 class="title title-big">${LANG.volume}</h2>
              <div class="toggle">
                <span class="toggle-text toggle-volume-text-js">${
                  settings.isVolume ? LANG.on : LANG.off
                }</span>
                <button class="toggle-btn ${
                  settings.isVolume ? 'toggle-btn-active' : ''
                } btn-volume-js"></button>
              </div>
              <div class="volume volume-js">
                <input class="volume-progress volume-progress-js" type="range" value="${
                  settings.volume
                }" step="0.01" max="1" ${settings.isVolume ? '' : 'disabled'}>
              </div>
            </li>

            <li class="settings-item time-item-js">
              <h2 class="title title-big">${LANG.time}</h2>
              <div class="toggle">
                <span class="toggle-text toggle-timegame-text-js">${
                  settings.isTimeGame ? LANG.on : LANG.off
                }</span>
                <button class="toggle-btn ${
                  settings.isTimeGame ? 'toggle-btn-active' : ''
                } btn-time-game-js"></button>
              </div>
            </li>

            <li class="settings-item answer-item-js">
              <h2 class="title title-big">${LANG.timeAns}</h2>
              <div class="answer">
              <button class="answer-btn answer-btn-minus answer-btn-minus-js" ${
                settings.isTimeGame ? '' : 'disabled'
              }>&ndash;</button>
                <input class="answer-text time-to-answer-js" type="number" min="5" max="30" step="5" value="${
                  settings.timeToAnswer
                }" readonly>
                <button class="answer-btn answer-btn-plus answer-btn-plus-js" ${
                  settings.isTimeGame ? '' : 'disabled'
                }>&#43;</button>
              </div>
            </li>
            <li class="settings-item answer-item-js">
              <h2 class="title title-big">${LANG.miniQuizQues}</h2>
              <div class="answer">
              <button class="answer-btn answer-btn-minus quiz-btn-minus-js">&ndash;</button>
                <input class="answer-text time-quiz-js" type="number" min="10" max="30" step="5" value="${
                  settings.quesInMiniQuiz
                }" readonly>
                <button class="answer-btn answer-btn-plus quiz-btn-plus-js">&#43;</button>
              </div>
            </li>
            <li class="settings-item lang-item-js">
              <h2 class="title title-big">${LANG.language}</h2>
              <form class="form">
                <label class="form-radio toggle-text rus-js">
                  <input class="lang-radio " type="radio" name="language" ${
                    settings.lang === 'rus' ? 'checked' : ''
                  }>
                  Русский
                </label>
                <label class="form-radio toggle-text eng-js">
                  <input class="lang-radio" type="radio" name="language" ${
                    settings.lang === 'eng' ? 'checked' : ''
                  }>
                  English
                </label>
              </form>
            </li>
          </ul>

          <div class="settings-controls settings-controls-js">
            <button class="control-btn default-btn default-btn-js">${
              LANG.defaultBtn
            }</button>
            <button class="control-btn save-btn save-btn-js">${
              LANG.saveBtn
            }</button>
          </div>`;
}
