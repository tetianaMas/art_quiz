import langManager from '../../../services/lang/langManager';

export default function paintingTemplate(
  question,
  variants = '',
  bullets = ''
) {
  const LANG = langManager.getLang().nav;
  return `
        <div class="buttons-nav-wrapper">
        <button class="nav-btn btn-link btn-nav-main-js">
          ${LANG.main}
        </button>
        <button class="nav-btn btn-link btn-nav-categ-js">
        ${LANG.categories}
        </button>
        </div>
        <p class="question-text question-text-js">${question}</p>
          <div class="question-wrapper">
            <div class="questions-pagination">
              ${bullets}
            </div>
            <div class="question-controls question-controls-js">
            ${variants}
            </div>
          </div>`;
}
