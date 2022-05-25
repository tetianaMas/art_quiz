import eventBus from '../../../services/eventBus';
import router from '../../../routes';

export default class PopupController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.router = router;
    eventBus.subscribe('answer-popup', (args) => {
      const [isRightAnswer, data, img] = args;
      data.img = img;

      this.createAnswerModal(isRightAnswer, data);
    });

    eventBus.subscribe('result-popup', (answers) => {
      this.createResultModal(answers);
    });

    eventBus.subscribe('quit-game', this.renderQuit.bind(this));
  }

  createAnswerModal(isRightAnswer, data) {
    this.view.renderAnswer(isRightAnswer, data);
    this.initAnswerEvents();
  }

  createResultModal(answers) {
    this.view.renderResult(answers);
    this.initResultEvents();
  }

  initAnswerEvents() {
    this.view.btnContainer.removeEventListener(
      'click',
      this.handleNextQuestion.bind(this)
    );
    this.view.btnContainer.addEventListener(
      'click',
      this.handleNextQuestion.bind(this)
    );
  }

  initResultEvents() {
    this.view.btnContainer.removeEventListener(
      'click',
      this.handleResult.bind(this)
    );
    this.view.btnContainer.addEventListener(
      'click',
      this.handleResult.bind(this)
    );
  }

  closePopup() {
    this.view.removePopup();
  }

  handleNextQuestion(e) {
    e.stopPropagation();
    if (e.target.classList.contains('btn-next-js')) {
      this.closePopup();
      eventBus.post('next-question');
    }
  }

  handleResult(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains('popup-btn') ||
      e.target.classList.contains('btn-link')
    ) {
      this.closePopup();
    }
    if (e.target.classList.contains('btn-category-js')) {
      this.closePopup();
      this.router.return();
    }
    if (e.target.classList.contains('btn-yes-js')) {
      this.closePopup();
      eventBus.post('stop-quiz');
    }
    if (e.target.classList.contains('btn-no-js')) {
      this.closePopup();
    }
  }

  renderQuit() {
    this.view.renderQuit();
    this.initResultEvents();
  }
}
