import eventBus from '../../services/eventBus';
import router from '../../routes';

export default class QuizPageController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.router = router;
    eventBus.subscribe('start-quiz', (args) => {
      const [category, quizType] = args;
      this.createQuiz(category, quizType);
    });

    eventBus.subscribe('next-question', this.nextQuestion.bind(this));
    eventBus.subscribe('timer-expired', this.handleAnswer.bind(this));
  }

  createQuiz(category, quizType) {
    this.model.setCategory(category);
    this.model.setQuizType(quizType);
    this.renderQuestion();
  }

  async renderQuestion() {
    const quizType = this.model.getQuizType();
    const questions = await this.model.getAllQuestions(quizType);
    const index = this.model.getQuestionIndex();
    const currAnswers = this.model.getCurrenAnswers();

    this.view.render(questions, quizType, index, currAnswers);
    this.initEvent();
    eventBus.post('timer');
  }

  initEvent() {
    const buttonsContainer = this.view.rootNode.querySelector(
      '.question-controls-js'
    );
    buttonsContainer.removeEventListener('click', this.handleAnswer.bind(this));
    buttonsContainer.addEventListener('click', this.handleAnswer.bind(this));
    this.view.rootNode.removeEventListener('click', this.return.bind(this));
    this.view.rootNode.addEventListener('click', this.return.bind(this));
  }

  handleAnswer(e) {
    if (e) {
      e.stopPropagation();
    }
    eventBus.post('timer-stop');

    const quizType = this.model.getQuizType();
    const isRightAnswer = this.getRightAnswer(e, quizType);
    const questionImg = this.getImageQuestion(quizType);
    const questionData = this.model.getQuestionData();
    this.colorBullet();
    eventBus.post('answer-popup', [isRightAnswer, questionData, questionImg]);
  }

  getRightAnswer(e, quizType) {
    const elem = e ? e.target : e;
    const rightAnswer = this.model.getRightAnswer();
    let isRightAnswer;
    if (quizType === 'author') {
      isRightAnswer = rightAnswer === (elem ? elem.textContent : elem);
    } else {
      isRightAnswer =
        rightAnswer === (elem ? elem.closest('.question-btn-js').id : elem);
    }
    eventBus.post('play', `${isRightAnswer ? 'right' : 'wrong'}`);
    this.model.saveAnswer(isRightAnswer);

    return isRightAnswer;
  }

  getImageQuestion(quizType) {
    const rightAnswer = this.model.getRightAnswer();
    const index = this.model.getQuestionIndex();
    const data = this.model.questions[index];
    let img;
    if (quizType === 'author') {
      img = data.img;
    } else {
      img = data.variants.find((elem) => elem.id === rightAnswer);
    }

    return img;
  }

  colorBullet() {
    let index = this.model.getQuestionIndex();
    if (index >= this.model.maxQuestions) {
      index -= 1;
    }
    const currAnswers = this.model.getCurrenAnswers();
    this.view.colorBullet(index, currAnswers);
  }

  nextQuestion() {
    this.model.increaseQuestionIndex();
    const questionsAmount = this.model.maxQuestions;
    const currIndex = this.model.getQuestionIndex();

    if (currIndex >= questionsAmount) {
      this.stopQuiz();
    } else {
      this.renderQuestion();
    }
  }

  stopQuiz() {
    eventBus.post('play', 'end');
    this.colorBullet();
    this.model.removeOldResult();
    this.model.saveAnswersToLs();
    eventBus.post('result-popup', this.model.getCurrenAnswers());
    eventBus.post('set-active-category', this.model.getDataAboutRound());
    eventBus.post('timer-stop');

    this.model.resetData();
  }

  return(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains('close-question-js') ||
      e.target.classList.contains('btn-nav-categ-js')
    ) {
      eventBus.post('timer-stop');
      const quizType = this.model.getQuizType();
      this.model.resetData();
      this.router.navigate(`/category-${quizType}`);
    }
    if (e.target.classList.contains('btn-nav-main-js')) {
      eventBus.post('timer-stop');
      this.model.resetData();
      this.router.navigate('/main');
    }
  }
}
