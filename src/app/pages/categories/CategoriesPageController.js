import eventBus from '../../services/eventBus';
import Utils from '../../services/Utils';
import router from '../../routes';

export default class CategoriesPageController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.router = router;
    eventBus.subscribe('category-author', async (type) => {
      await this.createCategory(type);
      this.view.renderCards(this.model.getCategoryData());
    });

    eventBus.subscribe('category-painting', async (type) => {
      await this.createCategory(type);
      this.view.renderCards(this.model.getCategoryData());
    });

    eventBus.subscribe('set-active-category', (category) => {
      this.model.setCategoryData(category);
    });
    eventBus.subscribe('quiz', async (args) => {
      const [type, id] = args;
      await this.createCategory(type);
      this.startQuiz(id);
    });
    this.init();
  }

  init() {
    this.view.containerNode.removeEventListener(
      'click',
      this.handleQuiz.bind(this)
    );
    this.view.containerNode.addEventListener(
      'click',
      this.handleQuiz.bind(this)
    );
  }

  async createCategory(type) {
    try {
      this.view.render();
      this.model.setCurrentCategory(type);
      await this.model.loadCategoryData();
    } catch (err) {
      console.log(err);
    }
  }

  handleQuiz(e) {
    e.stopPropagation();
    const elem = e.target;
    if (elem.closest('.show-score')) {
      this.showScore(elem.closest('.card').id);
    } else if (elem.closest('.card')) {
      const id = Utils.getNumberFromString(elem.closest('.card').id);
      const type = this.model.getCategoryType();
      this.router.navigate(`question/${type}/${id}`);
    }
  }

  startQuiz(id) {
    const cards = this.model.getCategoryData();
    const currCard = cards.find(
      (card) => card.id === Utils.getNumberFromString(id)
    );
    const quizType = this.model.getCategoryType();

    eventBus.post('start-quiz', [currCard, quizType]);
  }

  showScore(id) {
    const path = this.router.getRoute().replace(/\/*$/, '');
    const newPath = `${path}/score/${id}`;
    window.location.hash = '';
    window.location.hash = newPath;
  }
}
