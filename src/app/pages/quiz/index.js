import QuizPageController from './QuizPageController';
import QuizPageView from './QuizPageView';
import QuizPageModel from './QuizPageModel';

export const quizPageView = new QuizPageView();
export const quizPageModel = new QuizPageModel();
export const quizPageController = new QuizPageController(
  quizPageModel,
  quizPageView
);
