import header from '../../components/header';
import authorTemplate from './template/author';
import paintingTemplate from './template/painting';
import variant from './template/variant';
import pictureVariant from './template/pictureVariant';
import bullet from './template/bullet';
import Utils from '../../services/Utils';

export default class QuizPageView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.mainNode = this.rootNode.querySelector('.main-js .container');
    this.footerNode = this.rootNode.querySelector('.page-controls-js');
    this.headerTemplate = header;
    this.questionTemplates = {
      author: authorTemplate,
      painting: paintingTemplate,
    };
    this.renderQuestion = {
      author: this.getAuthorQuestionLayout.bind(this),
      painting: this.getPaintingQuestionLayout.bind(this),
    };
    this.variantTemplate = variant;
    this.pictureVariantTemplate = pictureVariant;
    this.bulletTemplate = bullet;
  }

  render(questions, quizType, index, currAnswers) {
    const headerLayout = this.getHeaderLayout();
    const questionLayout = this.renderQuestion[quizType](
      quizType,
      questions,
      index,
      currAnswers
    );
    const oldNav = this.footerNode.querySelector('.nav');
    if (oldNav) {
      oldNav.remove();
    }
    Utils.resetAppClass(this.rootNode, 'app question');

    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';
    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.mainNode.insertAdjacentHTML('beforeend', questionLayout);
  }

  getHeaderLayout() {
    return this.headerTemplate();
  }

  getAuthorQuestionLayout(quizType, questions, currIndex, currAnswers) {
    const currentQuestion = questions[currIndex];
    const { question } = currentQuestion;
    const template = this.questionTemplates[quizType];
    const bullets = this.getBulletsLayout(questions.length, currAnswers);
    const vars = currentQuestion.variants
      .map((item) => this.variantTemplate(item))
      .join(' ');
    const imageSrc = currentQuestion.img[0].src;

    return template(question, imageSrc, vars, bullets);
  }

  getPaintingQuestionLayout(quizType, questions, currIndex, currAnswers) {
    const currentQuestion = questions[currIndex];
    const { question } = currentQuestion;
    const template = this.questionTemplates[quizType];
    const bullets = this.getBulletsLayout(questions.length, currAnswers);
    const vars = currentQuestion.variants
      .map((item) => this.pictureVariantTemplate(item.src))
      .join(' ');

    return template(question, vars, bullets);
  }

  getBulletsLayout(amount, currAnswers) {
    let template = '';
    let i = amount;
    let k = 0;
    while (i > 0) {
      template += this.bulletTemplate(currAnswers[k]);
      i -= 1;
      k += 1;
    }
    return template;
  }

  colorBullet(currIndex, currAnswers) {
    const bullets = this.rootNode.querySelectorAll('.question-bullet-js');
    const isRightAnswer = currAnswers[currIndex]
      ? 'question-bullet-right'
      : 'question-bullet-wrong';
    bullets[currIndex].classList.add(isRightAnswer);
  }
}
