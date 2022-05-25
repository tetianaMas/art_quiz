import eventBus from './services/eventBus';
import Router from './Router';

export const routes = [
  {
    path: /main/,
    callback: () => {
      eventBus.post('main-load');
    },
  },
  {
    path: /settings/,
    callback: () => {
      eventBus.post('settings-load');
    },
  },
  {
    path: /question\/(.*)\/(\d{1,2})/,
    callback: (...args) => {
      eventBus.post('quiz', args);
    },
  },
  {
    path: /category-painting\/score\/(\d{1,2})/,
    callback: (...args) => {
      eventBus.post('score', ['painting', args]);
    },
  },
  {
    path: /category-author\/score\/(\d{1,2})/,
    callback: (...args) => {
      eventBus.post('score', ['author', args]);
    },
  },
  {
    path: /category-author/,
    callback: () => {
      eventBus.post('category-author', 'author');
    },
  },
  {
    path: /category-painting/,
    callback: () => {
      eventBus.post('category-painting', 'painting');
    },
  },
  {
    path: /mini-quiz-menu/,
    callback: () => {
      eventBus.post('miniquiz');
    },
  },
  {
    path: /mini-quiz-score/,
    callback: () => {
      eventBus.post('score-miniquiz');
    },
  },
  {
    path: /mini-quiz/,
    callback: () => {
      eventBus.post('start-miniquiz');
    },
  },
];

const router = new Router({
  root: '/main',
  mode: 'hash',
  routes,
});

export default router;
