import "./AboutMe.css";
import myFoto from "../../images/my-foto.jpg";
function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="main__section-title">Студент</h2>
      <hr className="main__section-separator" />
      <div className="about-me__two-columns">
        <div className="about-me__column">
          <h3 className="about-me__my-name">Илья</h3>
          <h4 className="about-me__column-header">Веб-разработчик, 32 года</h4>
          <p className="about-me__column-text">
            Родился в Краснодаре, но уже 20 лет живу в подмосковном
            Долгопрудном. Закончил юридический факультет РЭУ им. Г.В. Плеханова.
            У меня есть жена, а скоро будет и дочка. Увлекаюсь программированием
            с 2015го года, тогда я начал изучать Java в качестве хобби. С 2021го
            года изучаю веб-разработку. Последние 10 лет я работаю на компанию
            Bosch. Свое увлечение веб-разработкой я хочу направить на благо
            компании.
          </p>
          <ul className="about-me__link-list">
            <li>
              <a
                className="about-me__link"
                href="https://vk.com/ilya_chumak90"
                target="_blank"
                rel="noreferrer"
              >
                VK
              </a>
            </li>
            <li>
              <a
                className="about-me__link"
                href="https://github.com/ChumachI"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__my-foto" src={myFoto} alt="Илья Чумак" />
      </div>
    </section>
  );
}

export default AboutMe;
