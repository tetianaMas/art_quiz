export default function pictureVariant(src) {
  let id;
  const match = src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
  if (match) {
    id = match;
  }
  return `<button class="question-btn br-none question-btn-js" id="${id}">
            <img class="question-img" src="${src}" alt="question-img">
          </button>`;
}
