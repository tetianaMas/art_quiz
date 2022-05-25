import eventBus from '../../../services/eventBus';
import router from '../../../routes';
import Constants from '../../../services/constants';

export default class MiniQuizController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.quesAmount = Constants.questionsAmountInRound;
    this.router = router;
    this.quizStarted = false;
    eventBus.subscribe('miniquiz', this.renderMenu.bind(this));
    eventBus.subscribe('start-miniquiz', this.createQuiz.bind(this));
    eventBus.subscribe('timer-mini-quiz-expired', this.stopQuiz.bind(this));
    eventBus.subscribe('score-miniquiz', this.showScore.bind(this));
    eventBus.subscribe('miniquiz-ques-amount', (amount) =>
      this.setQuesAmount(amount)
    );
    this.view.rootNode.addEventListener('click', this.handleClick.bind(this));
  }

  renderMenu() {
    this.view.renderMenu();
  }

  setQuesAmount(amount) {
    if (amount) {
      this.quesAmount = amount;
    }
  }

  async createQuiz() {
    if (this.quizStarted) {
      return;
    }
    this.quizStarted = true;
    const allQuestions = await this.model.getData();
    this.quesAmount = this.model.getQuesAmount() || this.quesAmount;
    await this.model.createQuestions(allQuestions, this.quesAmount);
    this.renderQuestion();
  }

  renderQuestion() {
    this.view.renderQues(
      this.model.getCurrentQuestion(),
      this.model.getCurrenAnswers(),
      this.quesAmount
    );
    this.initEvent();
    eventBus.post('timer-mini-quiz');
  }

  updateQues() {
    this.view.updateQues(
      this.model.getCurrentQuestion(),
      this.model.getCurrenAnswers(),
      this.quesAmount
    );
    this.initEvent();
  }

  initEvent() {
    const buttonsContainer = this.view.rootNode.querySelector(
      '.question-controls-js'
    );
    const returnBtn = this.view.rootNode.querySelector('.close-question-js');
    buttonsContainer.removeEventListener('click', this.handleAnswer.bind(this));
    buttonsContainer.addEventListener('click', this.handleAnswer.bind(this));
    returnBtn.removeEventListener('click', this.return.bind(this));
    returnBtn.addEventListener('click', this.return.bind(this));
    this.view.rootNode.removeEventListener(
      'click',
      this.handleClick.bind(this)
    );
  }

  handleAnswer(e) {
    if (e) {
      e.stopPropagation();
    }
    const elem = e ? e.target : e;
    const isRightAnswer = this.model.checkAns(elem);
    eventBus.post('play', `${isRightAnswer ? 'right' : 'wrong'}`);
    this.model.saveAnswer(isRightAnswer);
    this.colorBullet();
    eventBus.post('timer-mini-quiz-answer', isRightAnswer);
    this.nextQuestion();
  }

  colorBullet() {
    let index = this.model.getQuestionIndex();
    if (index >= this.quesAmount) {
      index -= 1;
    }
    const currAnswers = this.model.getCurrenAnswers();
    this.view.colorBullet(index, currAnswers);
  }

  nextQuestion() {
    this.model.increaseQuestionIndex();
    const currIndex = this.model.getQuestionIndex();

    if (currIndex >= this.quesAmount) {
      this.stopQuiz();
    } else {
      this.updateQues();
    }
  }

  stopQuiz() {
    eventBus.post('play', 'end');
    this.colorBullet();
    this.quizStarted = false;
    this.model.countAns(this.quesAmount);
    this.model.saveScore();
    eventBus.post('result-popup', this.model.getCurrenAnswers());
    eventBus.post('timer-stop');

    this.model.resetData();
  }

  return(e) {
    e.stopPropagation();
    eventBus.post('timer-stop');
    this.quizStarted = false;
    this.router.navigate('/mini-quiz-menu');
    this.model.resetData();
  }

  async showScore() {
    const data = this.model.getScore();
    const res = await this.model.getBestResult(data);

    this.view.renderScore(res);
  }

  handleClick(e) {
    e.stopPropagation();
    if (e.target.classList.contains('return-btn-js')) {
      this.router.navigate('mini-quiz-menu');
    }
    if (e.target.closest('.card')) {
      const card = e.target.closest('.card');
      const info = card.querySelector('.info-js');
      if (info) {
        info.classList.toggle('active');
      }
    }

    if (e.target.classList.contains('btn-nav-ques-js')) {
      this.quizStarted = false;
      this.model.resetData();
      eventBus.post('timer-stop');
    }

    if (e.target.classList.contains('nav-mini-categories-js')) {
      this.router.navigate('/mini-quiz-menu');
    }
  }
}
