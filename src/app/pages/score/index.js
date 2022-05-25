import ScorePageController from './ScorePageController';
import ScorePageView from './ScorePageView';
import ScorePageModel from './ScorePageModel';

export const scorePageView = new ScorePageView();
export const scorePageModel = new ScorePageModel();
export const scorePageController = new ScorePageController(
  scorePageModel,
  scorePageView
);
