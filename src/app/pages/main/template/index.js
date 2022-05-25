import langManager from '../../../services/lang/langManager';

export default function main() {
  const LANG = langManager.getLang().main;
  return `
      <main class="main">
        <div class="container">
          <div class="logo">
            <div class="logo-icon"></div>
          </div>
          <div class="buttons-wrapper buttons-container-js">
            <button class="category-btn artists-btn artists-btn-js">
            <a class="btn-link" href="#/category-author">${LANG.authorQuiz}</a>
            
            </button>
            <button class="category-btn pictures-btn pictures-btn-js">
            <a class="btn-link" href="#/category-painting">${LANG.paintingQuiz}</a>
            </button>

            <button class="category-btn pictures-btn mini-quiz-btn-js">
            <a class="btn-link" href="#/mini-quiz-menu">${LANG.miniQuiz}</a>
            </button>
          </div>
        </div>
      </main>`;
}
