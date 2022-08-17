import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/ChumachI/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__list-text">Статичный сайт</p>
            <p className="portfolio__list-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/ChumachI/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <p className="portfolio__list-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/ChumachI/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <p className="portfolio__list-arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
