import langManager from '../../../../services/lang/langManager';

export default function main(title = '') {
  const LANG = langManager.getLang().miniQuiz;
  return `
      <h1 class="title">${title}</h1>

      <a class="card" id="start-miniQuiz" href="#/mini-quiz">
        <header class="card-header">
          <h3 class="title-sm" style="--delay: ${0}s">${LANG.start}</h3>
          <span class="questions"style="--delay: ${0}s"></span>
        </header>

        <div class="card-body" style="--delay: ${0}s">
          <img class="card-img" src="./assets/img/play.png" alt="category-img">
        </div>
      </a>

      <a class="card" id="score-miniQuiz" href="#/mini-quiz-score">
        <header class="card-header">
          <h3 class="title-sm" style="--delay: ${0.1}s">${LANG.stat}</h3>
          <span class="questions" style="--delay: ${0.1}s"></span>
        </header>

        <div class="card-body" style="--delay: ${0.1}s">
          <img class="card-img" src="./assets/img/stat.png" alt="category-img">
        </div>
      </a>`;
}
