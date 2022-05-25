import eventBus from '../../services/eventBus';
import Utils from '../../services/Utils';
import githubData from '../../services/dataService/githubData';
import router from '../../routes';

export default class ScorePageController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.router = router;
    eventBus.subscribe('score', (args) => {
      const [type, [id]] = args;
      this.createScore(type, id);
    });
  }

  async createScore(type, id) {
    const data = this.model.getData();
    const currData = data.find(
      (item) =>
        item.id === Utils.getNumberFromString(id) && item.quizType === type
    );
    const images = currData.category.paintings.map((img) => img.path);
    let loaded = await Utils.loadImages(images, githubData.address);
    loaded = loaded.map((img) => img.value);
    this.view.render(currData, loaded);
    this.initEvents();
  }

  initEvents() {
    this.view.headerNode.removeEventListener('click', this.return.bind(this));
    this.view.headerNode.addEventListener('click', this.return.bind(this));
  }

  return(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains('return-btn-js') ||
      e.target.classList.contains('nav-categories-js')
    ) {
      this.router.navToprevRoot();
    }
  }
}
