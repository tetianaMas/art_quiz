import langManager from '../../../../services/lang/langManager';

export default function quesTemp(question, bullets, buttons) {
  const LANG = langManager.getLang();
  return `
        <div class="buttons-nav-wrapper">
          <button class="nav-btn ">
            <a class="btn-link btn-nav-ques-js" href="#/main">${LANG.nav.main}</a>
          </button>
          <button class="nav-btn">
            <a class="btn-link btn-nav-ques-js" href="#/mini-quiz-menu">${LANG.nav.miniQuiz}</a>
          </button>
        </div>
        <div class="question-wrapper">
          <p class="question-text question-text-js">${LANG.miniQuiz.ques} ${question.author}?</p>

          <img class="question-img" src="${question.painting.node.src}" alt="question-img">
          <div class="questions-pagination">
            ${bullets}
          </div>
        </div>

        <div class="question-controls question-controls-js">
         ${buttons}
        </div>`;
}
