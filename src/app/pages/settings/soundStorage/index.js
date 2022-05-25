import soundPath from './soundsPath';

class SoundStorage {
  constructor() {
    this.states = {
      right: soundPath.rigthAnswer,
      wrong: soundPath.wrongAnswer,
      end: soundPath.endGame,
    };
    this.types = ['right', 'wrong', 'end'];
    this.audios = {};
    this.volume = 1;
    this.init();
  }

  init() {
    const audious = this.types.map((type) => this.loadAudio(type));

    return Promise.all(audious);
  }

  loadAudio(type) {
    return new Promise((res) => {
      this.res = res;
      this.audios[type] = new Audio();
      this.audios[type].src = this.states[type];
      this.audios[type].load();
      this.audios[type].removeEventListener(
        'loadeddata',
        this.handleLoad.bind(this)
      );
      this.audios[type].addEventListener(
        'loadeddata',
        this.handleLoad.bind(this)
      );
    });
  }

  handleLoad(e) {
    e.stopPropagation();

    this.res();
  }

  playAudio(type) {
    this.audios[type].play();
  }

  setVolume(value) {
    this.volume = value;
    this.types.forEach((type) => {
      this.audios[type].volume = value;
    });
  }

  mute() {
    this.types.forEach((type) => {
      this.audios[type].muted = true;
    });
  }

  unMute() {
    this.types.forEach((type) => {
      this.audios[type].muted = false;
      this.audios[type].volume = this.volume;
    });
  }

  toggleVolume() {
    this.types.forEach((type) => {
      this.audios[type].muted = !this.audios[type].muted;
    });
  }
}
const soundStorage = new SoundStorage();

export default soundStorage;
