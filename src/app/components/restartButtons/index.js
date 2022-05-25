import langManager from '../../services/lang/langManager';

export default function restartButtons() {
  const LANG = langManager.getLang().category;
  return `
    <button class="show-score show-score-js">
      <span class="show-score-icon"></span>
      <span class="show-score-text">${LANG.score}</span>
    </button>
  `;
}
