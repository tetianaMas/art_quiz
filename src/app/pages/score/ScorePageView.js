import header from '../../components/header';
import nav from '../../components/nav';
import logo from '../../components/logo';
import infoTemplate from './template/infoTemplate';
import Utils from '../../services/Utils';
import langManager from '../../services/lang/langManager';
import Constants from '../../services/constants';

export default class ScorePageView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.mainNode = this.rootNode.querySelector('.main-js .container');
    this.footerNode = this.rootNode.querySelector('.page-controls-js');
    this.containerNode = null;
    this.headerTemplate = header;
    this.navBar = nav;
    this.logo = logo;
    this.infoTemplate = infoTemplate;
    this.lang = langManager;
    this.init();
  }

  init() {
    this.containerNode = document.createElement('div');
    this.containerNode.classList.add('cards-wrapper');
    this.containerNode.removeEventListener('click', this.toggleInfo.bind(this));
    this.containerNode.addEventListener('click', this.toggleInfo.bind(this));
  }

  toggleInfo(e) {
    e.stopPropagation();
    if (e.target.closest('.card')) {
      this.card = e.target.closest('.card');
      const info = this.card.querySelector('.info-js');
      info.classList.toggle('active');
    }
  }

  render(data, images) {
    const navBarFooter = this.navBar('categories', true);
    const headerLayout = this.getHeaderLayout(data);
    Utils.resetAppClass(this.rootNode, 'app score');

    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';
    const oldNav = this.footerNode.querySelector('.nav');
    if (oldNav) {
      oldNav.remove();
    }
    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.footerNode.insertAdjacentHTML('afterbegin', navBarFooter);

    this.renderCards(data, images);
    this.returnBtn = this.rootNode.querySelector('.return-btn-js');
  }

  getHeaderLayout(data) {
    const lang = this.lang.getLang();
    return this.headerTemplate(
      `${lang.score.title} ${data.id}`,
      this.logo(),
      this.navBar()
    );
  }

  getNavBarLayout() {
    return this.navBar('');
  }

  renderCards(cards, images) {
    const info = cards.category.paintings;

    this.containerNode.innerHTML = '';
    images.forEach((img, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.append(img);
      if (cards.answers[index]) {
        card.classList.add('active');
      }
      card.setAttribute('style', `--delay: ${index / Constants.delay}s;`);
      card.setAttribute('id', info[index].id);
      const infoLayout = this.infoTemplate(info[index]);
      card.insertAdjacentHTML('beforeend', infoLayout);
      this.containerNode.append(card);
    });
    this.mainNode.innerHTML = '';
    this.mainNode.append(this.containerNode);
  }
}
