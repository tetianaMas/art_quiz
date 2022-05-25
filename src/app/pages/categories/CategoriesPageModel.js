import dataBaseManager from '../../services/dataService/dataBaseManager';
import CategoryItem from './CategoryItem/CategoryItem';
import Utils from '../../services/Utils';
import localStorage from '../../services/dataService/localStorage';
import langManager from '../../services/lang/langManager';
import Constants from '../../services/constants';

export default class CategoriesPageModel {
  constructor(itemsAmout) {
    this.itemsInCategory = itemsAmout;
    this.db = dataBaseManager;
    this.categories = {
      painting: [],
      author: [],
    };
    this.currentType = null;
    this.ls = localStorage;
    this.lang = langManager;
  }

  setCurrentCategory(type) {
    if (type && type.length > 0) {
      this.currentType = type;
    }
  }

  getCategoryType() {
    return this.currentType;
  }

  getCategoryData() {
    return this.categories[this.currentType];
  }

  async loadCategoryData() {
    try {
      const lang = this.lang.getLang();
      const data = await this.db.get(lang.source);
      if (!data) {
        return;
      }
      this.ls.setValue('questions', data);
      const splittedData = this.getSplittedData(data);
      const currentCategories = await this.getCurrentCategories(splittedData);

      this.categories[this.currentType] = currentCategories;
      this.setActiveCategories();
    } catch (err) {
      console.log(err);
    }
  }

  getSplittedData(data) {
    const categoriesData = {
      author: data.slice(data.length / Constants.halfPart, data.length),
      painting: data.slice(0, data.length / Constants.halfPart),
    };

    return categoriesData[this.currentType];
  }

  async getCurrentCategories(data) {
    const paintingsPerChunk = this.itemsInCategory;

    const result = data.reduce((resultArray, painting, index) => {
      const chunkIndex = Math.floor(index / paintingsPerChunk);
      const array = resultArray;

      if (!array[chunkIndex]) {
        array[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(painting);
      return resultArray;
    }, []);

    return Utils.getDataAsync(result, CategoryItem, 'loadCoverImg');
  }

  setActiveCategories() {
    const activeCategories = this.ls.getValue('categories');
    if (activeCategories && activeCategories.length) {
      activeCategories.forEach((category) => this.setCategoryData(category));
    }
  }

  setCategoryData(data) {
    const categories = this.getCategoryData();
    const currentCategory = categories.find(
      (currCategory) =>
        currCategory.id === data.category.id &&
        this.getCategoryType() === data.quizType
    );

    if (currentCategory) {
      currentCategory.isActive = true;
      currentCategory.rightAnswers = Utils.countTrueValInArr(data.answers);
    }
  }
}
