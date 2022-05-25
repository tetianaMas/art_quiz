export default function infoTemplate(info) {
  return `
    <div class="info info-js">
      <h6 class="info-title">${info.name}</h6>
      <p class="info-text">${info.author}, ${info.year}</p>
    </div>`;
}
