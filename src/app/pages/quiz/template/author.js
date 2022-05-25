import langManager from '../../../services/lang/langManager';

export default function authorTemplate(
  question,
  imgSrc,
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
        <div class="question-wrapper">
          <p class="question-text question-text-js">${question}</p>

          <img class="question-img" src="${imgSrc}" alt="question-img">
          <div class="questions-pagination">
            ${bullets}
          </div>
        </div>

        <div class="question-controls question-controls-js">
          ${variants}
        </div>`;
}
