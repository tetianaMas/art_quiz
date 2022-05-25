import langManager from '../../../../services/lang/langManager';

export default function popup(isRightAnswer, data) {
  const LANG = langManager.getLang().popup;
  return `<div class="overflow active overflow-js"></div>
  <div class="popup popup-answer ${
    isRightAnswer ? 'popup-answer-right' : 'popup-answer-wrong'
  } active popup-js">
    <div class="popup-img">
      <img src="${
        data.img[0] ? data.img[0].src : data.img.src
      }" alt="popup-image">
    </div>
    
    <p class="popup-text">${data.name}</p>
    <p class="popup-additional-text">${data.author}, ${data.year}</p>
    <div class="popup-controls popup-controls-js">
      <button class="popup-btn btn-cancel-js"></button>
      <button class="popup-btn popup-btn-pink btn-next-js">${LANG.next}</button>
    </div>
  </div>`;
}
