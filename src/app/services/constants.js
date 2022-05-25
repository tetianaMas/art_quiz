export default class Constants {
  static get itemsAmout() {
    return 10;
  }

  static get halfPart() {
    return 2;
  }

  static get delay() {
    return 10;
  }

  static get fullPercents() {
    return 100;
  }

  static get secondsDelay() {
    return 10;
  }

  static get questionsAmountInRound() {
    return 10;
  }

  static get maxTimeToAnswer() {
    return 10;
  }

  static get timeToIncreaseInTimer() {
    return 3;
  }

  static get totalTimeInTimer() {
    return 60;
  }

  static get variantsAmountInQuestion() {
    return 4;
  }

  static get settingsStep() {
    return 5;
  }

  static get settingsMax() {
    return 30;
  }

  static get settingsMin() {
    return 5;
  }

  static get defaultSettings() {
    return {
      isVolume: false,
      volume: 1,
      isTimeGame: false,
      timeToAnswer: Constants.settingsMin,
      quesInMiniQuiz: Constants.questionsAmountInRound,
      lang: 'rus',
    };
  }
}