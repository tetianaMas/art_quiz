import localStorage from '../../services/dataService/localStorage';
import Utils from '../../services/Utils';
import dataBaseManager from '../../services/dataService/dataBaseManager';
import githubData from '../../services/dataService/githubData';
import langManager from '../../services/lang/langManager';
import Constants from '../../services/constants';

export default class QuizPageModel {
  constructor() {
    this.category = null;
    this.quizType = null;
    this.variants = Constants.variantsAmountInQuestion;
    this.maxQuestions = Constants.questionsAmountInRound;
    this.questions = [];
    this.questionIndex = 0;
    this.currentAnswers = [];
    this.db = dataBaseManager;
    this.ls = localStorage;
    this.lang = langManager;
  }

  resetData() {
    this.questions = [];
    this.questionIndex = 0;
    this.currentAnswers = [];
  }

  setCategory(data) {
    if (data) {
      this.category = data;
    }
  }

  getCategory() {
    return this.category;
  }

  setQuizType(type) {
    if (type) {
      this.quizType = type;
    }
  }

  getQuizType() {
    return this.quizType;
  }

  getCurrenAnswers() {
    return this.currentAnswers;
  }

  async getAllQuestions(type) {
    if (this.questions.length) {
      return this.questions;
    }
    const questionsType = {
      author: this.createAuthorQuestions.bind(this),
      painting: this.createPaintingQuestions.bind(this),
    };
    this.questions = await questionsType[type]();

    return this.questions;
  }

  async createAuthorQuestions() {
    const categoryQuestions = this.category.paintings.map(
      async (item, index) => {
        const question = this.getCurrentQuestion(item);
        let img = await Utils.loadImages([item.painting], githubData.address);
        img = img.map((elem) => elem.value);
        const rightAnswer = item.author;
        const variants = this.getVariants(index);

        return {
          question,
          img,
          variants,
          rightAnswer,
        };
      }
    );

    return Promise.all(categoryQuestions);
  }

  async createPaintingQuestions() {
    const categoryQuestions = this.category.paintings.map(
      async (item, index) => {
        const question = this.getCurrentQuestion(item);
        const rightAnswer = item.painting;
        const rawVariants = this.getVariants(index);

        let variants = await Utils.loadImages(rawVariants, githubData.address);
        variants = variants.map((elem) => elem.value);

        return {
          question,
          variants,
          rightAnswer,
        };
      }
    );

    return Promise.all(categoryQuestions);
  }

  getRightAnswer(index = this.questionIndex) {
    return this.category.paintings[index][this.quizType];
  }

  getCurrentAuthor() {
    return this.category.paintings[this.questionIndex].author;
  }

  getCurrentQuestion(paintingData) {
    const question = {
      author: `${this.lang.getLang().question.authorQues} "${
        paintingData.name
      }"?`,
      painting: `${this.lang.getLang().question.paintingQues} ${
        paintingData.author
      }?`,
    };
    return question[this.quizType];
  }

  getQuestionData() {
    return this.category.paintings[this.questionIndex];
  }

  getVariants(index) {
    const questions = this.ls.getValue('questions');
    const uniqueVars = new Set();
    const rightAnswer = this.category.paintings[index];
    uniqueVars.add(rightAnswer);

    while (uniqueVars.size < this.variants) {
      const currIndex = Utils.getRandom(questions.length - 1);
      const variant = questions[currIndex];
      const temp = [...uniqueVars];

      const isExist = temp.find((elem) => {
        if (elem) {
          return (
            elem.author.toLowerCase() ===
            questions[currIndex].author.toLowerCase()
          );
        }

        return null;
      });

      if (!isExist) {
        uniqueVars.add(variant);
      }
    }
    let vars = [...uniqueVars];
    vars = vars.map((item) => item[this.quizType]);

    return Utils.shuffleArr(vars);
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

  saveAnswersToLs() {
    let data = this.ls.getValue('categories');
    if (!data) {
      data = [];
    }
    const categoryObj = this.getDataAboutRound();
    data.push(categoryObj);
    this.ls.setValue('categories', data);
  }

  getDataAboutRound() {
    return {
      id: this.category.id,
      quizType: this.quizType,
      category: this.category,
      categoryType: this.quizType,
      answers: this.currentAnswers,
      questions: this.questions,
    };
  }

  removeOldResult() {
    const data = this.ls.getValue('categories');
    if (data) {
      const oldRes = data.find(
        (item) =>
          item.category.id === this.category.id &&
          item.quizType === this.quizType
      );
      if (oldRes) {
        data.splice(data.indexOf(oldRes), 1);
        this.ls.setValue('categories', data);
        return true;
      }
    }

    return false;
  }
}
