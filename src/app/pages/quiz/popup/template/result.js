import langManager from '../../../../services/lang/langManager';

export default function popup(right, all) {
  const LANG = langManager.getLang().popup;

  return `<div class="overflow active overflow-js"></div>
  <div class="popup popup-gameover active popup-js">
    <div class="popup-img"></div>
    <p class="popup-text">${LANG.message}</p>
    <p class="popup-additional-text">${right}/${all}</p>
    <div class="popup-controls popup-controls-js">
      <button class="popup-btn">
        <a class="btn-link" href="#/main">${LANG.main}</a>
      </button>
      <button class="popup-btn popup-btn-pink btn-category-js">
        ${LANG.next}
      </button>
    </div>
  </div>`;
}
