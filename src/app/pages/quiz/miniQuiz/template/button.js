import langManager from '../../../../services/lang/langManager';

export default function button() {
  const LANG = langManager.getLang().miniQuiz;
  return `<button class="question-btn btn-true-js">${LANG.btnYes}</button>
  <button class="question-btn btn-false-js">${LANG.btnNo}</button>`;
}
