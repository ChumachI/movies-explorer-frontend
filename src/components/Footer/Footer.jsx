import "./Footer.css";
import { Route } from "react-router-dom";
function Footer() {
  const endpoints = ["/movies", "/saved-movies", "/"];
  const year = new Date().getFullYear();

  return (
    <Route exact path={endpoints}>
      <footer className="footer">
        <p className="footer__text footer__text_color_grey">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <hr className="footer__separator" />
        <div className="footer__bottom-block">
          <p className="footer__text">
            &copy;<time className="footer__bottom-text">{year}</time>
          </p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a
                className="footer__link footer__text"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__link footer__text"
                href="https://github.com/ChumachI"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__link footer__text"
                href="https://vk.com/ilya_chumak90"
                target="_blank"
                rel="noreferrer"
              >
                VK
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </Route>
  );
}

export default Footer;
