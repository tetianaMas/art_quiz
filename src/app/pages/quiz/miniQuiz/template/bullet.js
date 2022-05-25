export default function bullet(isRightAnswer) {
  let activeClass;
  if (isRightAnswer === true) {
    activeClass = 'question-bullet-right';
  } else if (isRightAnswer === undefined) {
    activeClass = '';
  } else {
    activeClass = 'question-bullet-wrong';
  }
  return `<span class="question-bullet ${activeClass} question-bullet-js"></span>`;
}
