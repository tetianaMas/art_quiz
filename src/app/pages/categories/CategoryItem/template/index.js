import langManager from '../../../../services/lang/langManager';
import Constants from '../../../../services/constants';

export default function card(
  isActive,
  index,
  src,
  restartButtonsTemplate = '',
  rightAnswers = '',
  allAnswers = ''
) {
  const LANG = langManager.getLang().category;
  const result = `${rightAnswers}/${allAnswers}`;
  return `
  <div class="card ${isActive ? 'active' : ''}" id="${index}">
  <header class="card-header">
    <h3 class="title-sm" style="--delay: ${index / Constants.delay}s">${
    LANG.title
  } ${index}</h3>
    <span class="questions" style="--delay: ${index / Constants.delay}s">${
    isActive ? result : ''
  }</span>
  </header>

  <div class="card-body" style="--delay: ${index / Constants.delay}s">
    <img class="card-img" src="${src}" alt="category-img">
    ${isActive ? restartButtonsTemplate : ''} 
  </div>
</div>`;
}
