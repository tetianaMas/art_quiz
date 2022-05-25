import CategoriesPageController from './CategoriesPageController';
import CategoriesPageView from './CategoriesPageView';
import CategoriesPageModel from './CategoriesPageModel';
import Constants from '../../services/constants';

export const categoriesPageModel = new CategoriesPageModel(Constants.itemsAmout);
export const categoriesPageView = new CategoriesPageView();
export const categoriesPageController = new CategoriesPageController(
  categoriesPageModel,
  categoriesPageView
);
