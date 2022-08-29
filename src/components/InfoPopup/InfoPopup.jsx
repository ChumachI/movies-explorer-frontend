import "./InfoPopup.css";
import redCircleCross from "../../images/RedCircleCross.svg";
import successImage from "../../images/BlackCircleDone.svg";
function InfoPopup({
  isInfoPopupOpen,
  infoPopupMessage,
  closeInfoPopup,
  infoPopupStatus,
}) {
  return (
    <div className={`info-popup ${isInfoPopupOpen && "info-popup_opened"}`}>
      <div className="info-popup__container">
        <button
          className="info-popup__close"
          type="button"
          onClick={closeInfoPopup}
        ></button>
        <img
          className="info-popup__info-image"
          src={infoPopupStatus ? successImage : redCircleCross}
          alt="Иконка статуса"
        />
        <h3 className="info-popup__header">{infoPopupMessage}</h3>
      </div>
    </div>
  );
}

export default InfoPopup;
