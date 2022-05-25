import footer from '../../../components/footer';
import header from '../../../components/header';
import main from './template/main';
import nav from '../../../components/nav';
import logo from '../../../components/logo';
import questionTemp from './template/quesTemp';
import bullet from './template/bullet';
import button from './template/button';
import Utils from '../../../services/Utils';
import infoTemplate from '../../score/template/infoTemplate';
import langManager from '../../../services/lang/langManager';
import Constants from '../../../services/constants';

export default class MiniQuizView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.mainNode = this.rootNode.querySelector('.main-js .container');
    this.footerNode = this.rootNode.querySelector('.page-controls-js');
    this.footerTemplate = footer;
    this.headerTemplate = header;
    this.main = main;
    this.navBar = nav;
    this.logo = logo;
    this.questionTemplate = questionTemp;
    this.bulletTemplate = bullet;
    this.button = button;
    this.infoTemplate = infoTemplate;
    this.lang = langManager;
  }

  renderMenu() {
    const lang = this.lang.getLang();
    const navBarFooter = this.navBar('categories', true, lang.nav.miniQuiz);
    const headerLayout = this.getHeaderLayout();
    const mainLayout = this.getMainLayout();

    Utils.resetAppClass(this.rootNode, 'app categories mini-quiz');

    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';
    const oldNav = this.footerNode.querySelector('.nav');
    if (oldNav) {
      oldNav.remove();
    }
    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.mainNode.insertAdjacentHTML('beforeend', mainLayout);
    this.footerNode.insertAdjacentHTML('afterbegin', navBarFooter);
  }

  renderQues(question, currAnswers, questionsAmount) {
    Utils.resetAppClass(this.rootNode, 'app question');
    const headerLayout = this.headerTemplate();
    const headerContainer = this.rootNode.querySelector(
      '.header-js .container'
    );
    headerContainer.innerHTML = '';
    headerContainer.insertAdjacentHTML('beforeend', headerLayout);
    this.updateQues(question, currAnswers, questionsAmount);
  }

  updateQues(question, currAnswers, questionsAmount) {
    const questionLayout = this.getQuestionLayout(
      question,
      currAnswers,
      questionsAmount
    );

    const container = this.rootNode.querySelector('.main-js .container');
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', questionLayout);
  }

  getHeaderLayout() {
    const lang = this.lang.getLang();

    return this.headerTemplate(
      '',
      this.logo(),
      this.navBar('categories', false, lang.nav.miniQuiz)
    );
  }

  getMainLayout() {
    return this.main();
  }

  getQuestionLayout(question, currAnswers, questionsAmount) {
    const bullets = this.getBulletsLayout(questionsAmount, currAnswers);
    const buttons = this.button();
    return this.questionTemplate(question, bullets, buttons);
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

  renderScore(data) {
    const lang = this.lang.getLang();
    const navBarFooter = this.navBar(
      '',
      true,
      lang.nav.miniQuiz,
      'nav-mini-categories-js'
    );
    const headerLayout = this.headerTemplate(
      '',
      this.logo(),
      this.navBar('', false, lang.nav.miniQuiz, 'nav-mini-categories-js')
    );
    Utils.resetAppClass(this.rootNode, 'app score');

    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';
    const oldNav = this.footerNode.querySelector('.nav');
    if (oldNav) {
      oldNav.remove();
    }
    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.footerNode.insertAdjacentHTML('afterbegin', navBarFooter);

    if (data && data.questions && data.questions.length) {
      this.renderCards(data);
    } else {
      this.renderEmpty();
    }
    this.returnBtn = this.rootNode.querySelector('.return-btn-js');
  }

  renderCards(cards) {
    this.containerNode = document.createElement('div');
    this.containerNode.classList.add('cards-wrapper');

    this.containerNode.innerHTML = '';
    cards.questions.forEach((elem, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.append(elem.painting.node);
      if (elem.isRight) {
        card.classList.add('active');
      }
      card.setAttribute('style', `--delay: ${index / Constants.secondsDelay}s;`);
      card.setAttribute('id', elem.painting.painting);
      const infoLayout = this.infoTemplate(elem);
      card.insertAdjacentHTML('beforeend', infoLayout);
      this.containerNode.append(card);
    });
    this.mainNode.innerHTML = '';
    this.mainNode.append(this.containerNode);
    this.setRes(cards.answers);
  }

  setRes(res) {
    if (!res) {
      return;
    }
    let counter = 0;
    res.forEach((ans) => {
      if (ans) {
        counter += 1;
      }
    });
    const lang = this.lang.getLang();
    const allCardsLength = res.length;
    this.mainNode.insertAdjacentHTML(
      'afterbegin',
      `<p class="best-res shine">${lang.miniQuiz.scoreStat}${counter} / ${allCardsLength}</p>`
    );
  }

  renderEmpty() {
    const lang = this.lang.getLang();
    this.mainNode.innerHTML = '';
    const info = `<p class="shine">${lang.miniQuiz.noData}</p>`;
    this.mainNode.insertAdjacentHTML('afterbegin', info);
  }
}
