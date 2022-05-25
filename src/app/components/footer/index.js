export default function footer(navBarTemplate = '') {
  return `
  ${navBarTemplate}
  <footer class="page-footer">
      <div class="container">
        <a class="footer-logo" href="https://rs.school/js/" target="_blank"></a>
        <a class="footer-author" href="https://github.com/tetianaMas" target="_blank">tetianaMas</a>
        <span class="footer-year">&copy;2021</span>
      </div>
    </footer>
  `;
}
