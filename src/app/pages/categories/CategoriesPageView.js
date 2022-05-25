import header from '../../components/header';
import nav from '../../components/nav';
import logo from '../../components/logo';
import Utils from '../../services/Utils';

export default class CategoriesPageView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.mainNode = this.rootNode.querySelector('.main-js .container');
    this.footerNode = this.rootNode.querySelector('.page-controls-js');
    this.containerNode = null;
    this.headerTemplate = header;
    this.navBar = nav;
    this.logo = logo;
    this.init();
  }

  init() {
    this.containerNode = document.createElement('div');
    this.containerNode.classList.add('cards-wrapper');
  }

  render() {
    const navBarFooter = this.navBar('categories', true);
    const headerLayout = this.getHeaderLayout();
    Utils.resetAppClass(this.rootNode, 'app categories');

    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';
    const oldNav = this.footerNode.querySelector('.nav');
    if (oldNav) {
      oldNav.remove();
    }

    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.footerNode.insertAdjacentHTML('afterbegin', navBarFooter);
  }

  getHeaderLayout() {
    return this.headerTemplate('', this.logo(), this.navBar('categories'));
  }

  getNavBarLayout() {
    return this.navBar('');
  }

  renderCards(cards) {
    this.mainNode.innerHTML = '';
    this.containerNode.innerHTML = '';
    cards.forEach((card, index) => {
      this.containerNode.insertAdjacentHTML(
        'beforeend',
        card.getTemplate(index + 1)
      );
    });

    this.mainNode.append(this.containerNode);
  }
}
