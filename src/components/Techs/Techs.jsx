import "./Techs.css";
function Techs() {
  return (
    <section className="tech" id="technologies">
      <h2 className="main__section-title">Технологии</h2>
      <hr className="main__section-separator" />
      <div className="tech__content">
        <h3 className="tech__title">7 технологий</h3>
        <p className="main__section-text tech__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="tech__list">
          <li className="tech__list-item main__section-text">HTML</li>
          <li className="tech__list-item main__section-text">CSS</li>
          <li className="tech__list-item main__section-text">JS</li>
          <li className="tech__list-item main__section-text">React</li>
          <li className="tech__list-item main__section-text">Git</li>
          <li className="tech__list-item main__section-text">Express.js</li>
          <li className="tech__list-item main__section-text">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
