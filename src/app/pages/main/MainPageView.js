import footer from '../../components/footer';
import header from '../../components/header';
import main from './template';
import Utils from '../../services/Utils';

export default class MainPageView {
  constructor() {
    this.rootNode = document.getElementById('app');
    this.headerNode = this.rootNode.querySelector('.header-js .container');
    this.mainNode = this.rootNode.querySelector('.main-js .container');
    this.footerTemplate = footer;
    this.headerTemplate = header;
    this.mainTemplate = main;
  }

  render() {
    const headerLayout = this.getHeaderLayout();
    const mainLayout = this.getMainLayout();
    Utils.resetAppClass(this.rootNode, 'app bg-img');
    this.headerNode.innerHTML = '';
    this.mainNode.innerHTML = '';

    this.headerNode.insertAdjacentHTML('beforeend', headerLayout);
    this.mainNode.insertAdjacentHTML('beforeend', mainLayout);
  }

  getHeaderLayout() {
    return this.headerTemplate();
  }

  getMainLayout() {
    return this.mainTemplate();
  }
}
