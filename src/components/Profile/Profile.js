import "./Profile.css";
function Profile({ name, email, handleExit }) {
  return (
    <section className="profile">
      <h1 className="profile__header">Привет, {name}!</h1>
      <div className="profile__data">
        <div className="profile__data-line">
          <p className="profile__data-text">Имя</p>
          <p className="profile__data-text">{name}</p>
        </div>
        <hr className="profile__data-separator" />
        <div className="profile__data-line">
          <p className="profile__data-text">E-mail</p>
          <p className="profile__data-text">{email}</p>
        </div>
      </div>
      <div className="profile__bottom-buttons">
        <button className="profile__bottom-button">Редактировать</button>
        <button
          className="profile__bottom-button profile__bottom-button_color_red"
          onClick={handleExit}
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
