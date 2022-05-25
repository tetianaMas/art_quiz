import PaintingItem from './PaintingItem/PaintingItem';
import restartButtons from '../../../components/restartButtons';
import githubData from '../../../services/dataService/githubData';
import template from './template';

export default class CategoryItem {
  constructor(paintings, id) {
    this.template = template;
    this.coverImg = null;
    this.paintings = paintings;
    this.restartButtonsTemplate = restartButtons;
    this.isActive = false;
    this.rightAnswers = null;
    this.paintingsAmount = paintings.length;
    this.id = id;
    this.init();
  }

  async init() {
    const allPaintings = this.paintings.map(
      (painting, index) => new PaintingItem(painting, index)
    );

    this.paintings = allPaintings;
  }

  async loadCoverImg() {
    return new Promise((resolve) => {
      const imgPath = this.paintings[0].painting;
      const image = new Image();
      image.src = `${githubData.address}img/${imgPath}.jpg`;
      image.onload = async (e) => {
        e.stopPropagation();
        this.coverImg = image.src;
        resolve();
      };
    });
  }

  getTemplate(index) {
    return this.template(
      this.isActive,
      index,
      this.coverImg,
      this.restartButtonsTemplate(),
      this.rightAnswers,
      this.paintingsAmount
    );
  }
}
