export default function header(time = '5:00', progress = 100) {
  return `
        <input class="timer-progress timer-progress-js" type="range" value="${progress}" step="1" max="100">
        <p class="current-time">${time}</p>
  `;
}
