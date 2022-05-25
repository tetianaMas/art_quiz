export default function header(
  title = '',
  logoTemplate = '',
  navTemplate = '',
  timerTemplate = ''
) {
  return `
        <button class="return-btn return-btn-js"></button>
        <button class="close-question close-question-js"></button>
        ${timerTemplate}
        ${logoTemplate}
        ${navTemplate}
        <h1 class="title">${title}</h1>
        <button class="settings-btn settings-js">
          <a class="btn-link" href="#/settings"></a>
        </button>
  `;
}
