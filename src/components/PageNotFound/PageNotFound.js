import { useHistory } from "react-router-dom";
import "./PageNotFound.css";
function PageNotFound() {
  const history = useHistory();
  function goBack() {
    history.goBack();
  }
  return (
    <section className="page-not-found">
      <h1 className="page-not-found__error-code">404</h1>
      <p className="page-not-found__error-caption">Страница не найдена</p>
      <button
        onClick={goBack}
        className="page-not-found__link-to-previous-page"
        type="button"
      >
        Назад
      </button>
    </section>
  );
}

export default PageNotFound;
