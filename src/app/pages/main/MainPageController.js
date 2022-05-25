import eventBus from '../../services/eventBus';

export default class MainPageController {
  constructor(view) {
    this.view = view;
    eventBus.subscribe('main-load', () => {
      this.view.render();
    });
  }
}
