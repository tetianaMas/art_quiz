import answerTemplate from './template/answer';
import resultTemplate from './template/result';
import Utils from '../../../services/Utils';
import quitGame from './template/quitGame';

export default class PopupView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.answerTemplate = answerTemplate;
    this.resultTemplate = resultTemplate;
    this.quitTemplate = quitGame;
    this.popup = null;
    this.overflow = null;
  }

  renderAnswer(isRightAnswer, data) {
    const layout = this.answerTemplate(isRightAnswer, data);
    this.rootNode.insertAdjacentHTML('beforeend', layout);
    this.initNodes();
  }

  renderResult(answers) {
    const right = Utils.countTrueValInArr(answers);
    const allAmount = answers.length;
    const layout = this.resultTemplate(right, allAmount);

    this.rootNode.insertAdjacentHTML('beforeend', layout);
    this.initNodes();
  }

  initNodes() {
    this.overflow = this.rootNode.querySelector('.overflow-js');
    this.popup = this.rootNode.querySelector('.popup-js');
    this.btnContainer = this.popup.querySelector('.popup-controls-js');
  }

  removePopup() {
    this.overflow.classList.add('closed');
    this.popup.classList.add('closed');

    this.overflow.remove();
    this.popup.remove();
  }

  renderQuit() {
    const layout = this.quitTemplate();

    this.rootNode.insertAdjacentHTML('beforeend', layout);
    this.initNodes();
  }
}
