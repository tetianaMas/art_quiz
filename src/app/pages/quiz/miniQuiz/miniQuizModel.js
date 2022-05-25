import localStorage from '../../../services/dataService/localStorage';
import Utils from '../../../services/Utils';
import dataBaseManager from '../../../services/dataService/dataBaseManager';
import githubData from '../../../services/dataService/githubData';
import langManager from '../../../services/lang/langManager';
import Constants from '../../../services/constants';

export default class MiniQuizModel {
  constructor() {
    this.questions = [];
    this.questionIndex = 0;
    this.currentAnswers = [];
    this.db = dataBaseManager;
    this.ls = localStorage;
    this.lang = langManager;
  }

  async getData() {
    this.questions = this.ls.getValue('questions');
    this.questions = await this.getDataFromDb();

    return this.questions;
  }

  async getDataFromDb() {
    const lang = this.lang.getLang();
    const data = await this.db.get(lang.source);
    if (!data) {
      return [];
    }
    this.ls.setValue('questions', data);
    return data;
  }

  getQuesAmount() {
    const settings = this.ls.getValue('settings');
    if (settings) {
      return settings.quesInMiniQuiz;
    }
    return null;
  }

  async createQuestions(ques, amount) {
    this.questions = Utils.shuffleArr(ques);
    const questions = [...this.questions];
    const rightAmount = Math.round(amount / 2);
    const wrongAmount = amount - rightAmount;
    let wrongQues = new Set();

    const rightQues = Utils.getUniqueArr(this.questions, rightAmount);
    Utils.removeFromArr(rightQues, questions);

    while (wrongQues.size < wrongAmount) {
      const currIndex = Utils.getRandom(questions.length - 1);
      const variant = questions[currIndex];
      const temp = [...wrongQues];
      const isExist = temp.find((elem) => elem.author === variant.author);
      if (!isExist) {
        wrongQues.add(variant);
      }
    }
    wrongQues = [...wrongQues];
    Utils.removeFromArr(wrongQues, questions);
    const wrongQuesMixed = [];

    wrongQues.forEach((elem) => {
      const currElem = { ...elem };
      const variant = Utils.searchVariant(currElem, questions);
      if (variant.author && currElem.author !== variant.author) {
        currElem.author = currElem.author.replace(/.*/, variant.author);
        wrongQuesMixed.push(currElem);
      }
    });

    this.createdQuestions = rightQues.concat(wrongQuesMixed);
    this.createdQuestions = Utils.shuffleArr(this.createdQuestions);
    this.createdQuestionsRight = rightQues.concat(wrongQues);

    console.log(this.createdQuestions);

    await this.loadImages(this.createdQuestions);
  }

  async loadImages(img) {
    const images = img.map((item) =>
      typeof item.painting !== 'object' ? item.painting : item.painting.painting
    );
    const loadedImg = await Utils.loadImages(images, githubData.address);
    this.createdQuestions = img.map((item, index) => {
      const currItem = { ...item };
      currItem.painting = {
        painting: item.painting,
        node: loadedImg[index].value,
      };
      return currItem;
    });
  }

  getAllQuestions() {
    return this.createdQuestions;
  }

  getCurrentQuestion() {
    return this.createdQuestions[this.questionIndex];
  }

  checkAns(elem) {
    const isTrueChecked = elem.classList.contains('btn-true-js');
    const ques = this.getCurrentQuestion();
    const right = this.createdQuestionsRight.find(
      (item) => item.painting === ques.painting.painting
    );
    const rightAnswer = right.author === ques.author;
    right.isRight = isTrueChecked === rightAnswer;

    return isTrueChecked === rightAnswer;
  }

  resetData() {
    this.questionIndex = 0;
    this.currentAnswers = [];
    this.createdQuestions = [];
    this.createdQuestionsRight = [];
  }

  getCurrenAnswers() {
    return this.currentAnswers;
  }

  increaseQuestionIndex() {
    this.questionIndex += 1;
  }

  getQuestionIndex() {
    return this.questionIndex;
  }

  saveAnswer(isRightAnswer) {
    this.currentAnswers.push(isRightAnswer);
  }

  saveScore() {
    let data = this.ls.getValue('miniQuiz');
    if (!data) {
      data = [];
    }
    const categoryObj = this.getDataAboutRound();
    data.push(categoryObj);
    this.ls.setValue('miniQuiz', data);
  }

  getDataAboutRound() {
    return {
      answers: this.currentAnswers,
      questions: this.createdQuestionsRight,
      result: this.countAverageResult(),
    };
  }

  countAverageResult() {
    let counter = 0;
    const ans = this.getCurrenAnswers();
    ans.forEach((elem) => {
      if (elem) {
        counter += 1;
      }
    });
    const resultaverage = (counter * Constants.fullPercents) / ans.length;

    return `${resultaverage} %`;
  }

  getScore() {
    const data = this.ls.getValue('miniQuiz');

    return data || [];
  }

  async getBestResult(data) {
    if (!data) {
      return [];
    }

    let higher = 0;

    data.forEach((elem) => {
      const res = Utils.getNumberFromString(elem.result);
      if (res > higher) {
        higher = res;
      }
    });

    const bestRes = data.find(
      (item) => Utils.getNumberFromString(item.result) === higher
    );

    if (!bestRes) {
      return [];
    }
    await this.loadImages(bestRes.questions || []);
    bestRes.questions = this.createdQuestions;

    return bestRes;
  }

  countAns(max) {
    if (this.currentAnswers.length < max) {
      while (this.currentAnswers.length < max) {
        this.currentAnswers.push(false);
      }
    }
  }
}
