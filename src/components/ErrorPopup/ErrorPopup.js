import './ErrorPopup.css';
import redCircleCross from '../../images/RedCircleCross.svg';
function ErrorPopup({isErrorPopupOpen, errorPopupMessage, closeErrorPopup}){
  return (
    <div className={`error-popup ${isErrorPopupOpen && 'error-popup_opened'}`}>
      <div className="error-popup__container">
        <button
          className="error-popup__close"
          type="button"
          onClick={closeErrorPopup}
        ></button>
        <img className="error-popup__info-image" src={redCircleCross} alt='Красный крест в круглом обрамлении'/>
        <h3 className="error-popup__header">{errorPopupMessage}</h3>
        </div>
    </div>
  );
}

export default ErrorPopup;