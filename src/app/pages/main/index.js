import MainPageController from './MainPageController';
import MainPageView from './MainPageView';

export const mainPageView = new MainPageView();
export const mainPageController = new MainPageController(mainPageView);
