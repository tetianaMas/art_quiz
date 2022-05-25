import eventBus from '../eventBus';
import langRus from './langRus';
import langEng from './langEng';
import localStorage from '../dataService/localStorage';

class LangManager {
  constructor() {
    this.currentLang = 'rus';
    this.langData = {
      eng: langEng,
      rus: langRus,
    };
    eventBus.subscribe('change-lang', (lang) => this.setLang(lang));
    this.init();
  }

  init() {
    const settings = localStorage.getValue('settings');
    if (settings) {
      this.setLang(settings.lang);
    }
  }

  setLang(lang) {
    this.currentLang = lang;
  }

  getLang() {
    return this.langData[this.currentLang];
  }
}

const langManager = new LangManager();

export default langManager;
