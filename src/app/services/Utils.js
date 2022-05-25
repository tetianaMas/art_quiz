export default class Utils {
  static resetAppClass(node, classList) {
    const currentNode = node;

    if (typeof classList === 'string' && classList.length > 0) {
      currentNode.classList = classList;
    } else {
      currentNode.classList = '';
    }
  }

  static getPath(path) {
    path.toString().replace(/^\//, '').replace(/\\/, '').replace(/\/$/, '');

    return path;
  }

  static async getDataAsync(data, ItemToInit, funcName) {
    const newData = data.map(async (chunk, index) => {
      const item = new ItemToInit(chunk, index + 1);
      await item[funcName]();

      return item;
    });

    return Promise.all(newData);
  }

  static getNumberFromString(str) {
    if (typeof str !== 'string' || !str.length) {
      return str;
    }
    const RADIX = 10;
    return parseInt(str, RADIX);
  }

  static getFloatFromString(str) {
    if (typeof str !== 'string' || !str.length) {
      return false;
    }
    const RADIX = 10;
    return parseFloat(str, RADIX);
  }

  static getRandom(num) {
    return Math.floor(Math.random() * num);
  }

  static shuffleArr(arr) {
    if (!arr.length) {
      return arr;
    }

    const array = [];

    while (arr.length > 0) {
      const index = Utils.getRandom(arr.length);
      const variant = arr[index];
      array.push(variant);
      arr.splice(index, 1);
    }

    return array;
  }

  static async loadImages(images, address) {
    const loadedImg = images.map(
      async (img) =>
        new Promise((resolve) => {
          const imgPath = img;
          const image = new Image();
          image.src = `${address}img/${imgPath}.jpg`;
          image.id = imgPath;
          image.onload = async (e) => {
            e.stopPropagation();
            resolve(image);
          };
        })
    );

    return Promise.allSettled(loadedImg);
  }

  static countTrueValInArr(arr) {
    let counter = 0;
    arr.forEach((item) => {
      if (item === true) {
        counter += 1;
      }
    });

    return counter;
  }

  static return() {
    window.history.back();
  }

  static timeUpdate(cb) {
    const ONE_SECOND = 1000;

    return setTimeout(cb, ONE_SECOND);
  }

  static getUniqueArr(ques, amount) {
    const unique = new Set();

    while (unique.size < amount) {
      const currIndex = Utils.getRandom(ques.length - 1);
      const variant = ques[currIndex];
      unique.add(variant);
    }

    return [...unique];
  }

  static removeFromArr(arr, arrToRemove) {
    arr.forEach((item) => {
      arrToRemove.splice(arrToRemove.indexOf(item), 1);
    });
  }

  static searchVariant(elem, arr) {
    const currIndex = Utils.getRandom(arr.length - 1);
    const variant = arr[currIndex];
    if (variant.author && elem.author !== variant.author) {
      return variant;
    }
    Utils.searchVariant(elem, arr);
    return [];
  }
}
