import MiniQuizController from './miniQuizController';
import MiniQuizView from './miniQuizView';
import MiniQuizModel from './miniQuizModel';

export const miniQuizView = new MiniQuizView();
export const miniQuizModel = new MiniQuizModel();
export const miniQuizController = new MiniQuizController(
  miniQuizModel,
  miniQuizView
);
