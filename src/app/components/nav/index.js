import langManager from '../../services/lang/langManager';

export default function nav(
  checked,
  isIcons = false,
  navBtnText = '',
  additionalClass = ''
) {
  const LANG = langManager.getLang().nav;
  return `
    <nav class="nav" aria-label="Navigation">
      <button class="nav-btn">
      ${isIcons === true ? '<span class="home-icon"></span>' : ''}
        <a class="btn-link" href="#/main">${LANG.main}</a>
      </button>
      <button class="nav-btn ${checked === 'categories' ? 'checked' : ''} ${
    additionalClass || 'nav-categories-js'
  }">
      ${isIcons ? '<span class="categories-icon"></span>' : ''}
       ${navBtnText || LANG.categories}
      </button>
    </nav>`;
}
