import { useState } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../utils/context/currentUserContext";
import "./Profile.css";
function Profile({ handleExit, handleSubmitUserUpdate, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const [isChangeHappend, setChangeHappend] = useState(false);
  const [formInvalid, setFormInvalid] = useState(true);

  function handleSubmit(e) {
    handleSubmitUserUpdate(e)
    .then(()=>{
      setChangeHappend(false);
    })
    .catch(()=>{
      setChangeHappend(false);
    })
    
  }


  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        const re =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,4})$/i;
        if (!re.test(e.target.value.toLocaleLowerCase())) {
          setEmailError("Некорректный email");
          setFormInvalid(true);
        } else {
          setEmailError("");
          setFormInvalid(false);
        }
        break;
      case "name":
        setName(e.target.value);
        const ne = /^[a-zA-Zа-яА-Я -]*$/i;
        if (!ne.test(e.target.value)) {
          setNameError(
            "Имя должно содержать только латиницу, кириллицу, пробел или дефис"
          );
          setFormInvalid(true);
        } else if (e.target.value.length < 2) {
          setNameError("Имя слишком короткое");
          setFormInvalid(true);
        } else if (e.target.value.length > 30) {
          setNameError("Имя слишком длинное");
          setFormInvalid(true);
        } else {
          setNameError("");
          setFormInvalid(false);
        }
        break;
      default:
    }
    setChangeHappend(true);
  }

  return (
    <section className="profile">
      <h1 className="profile__header">Привет, {currentUser.name}!</h1>
      <form className="profile__data" id="edit">
        <div className="profile__data-line">
          <p className="profile__data-text">Имя</p>
          <input
            className="profile__data-field"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <hr className="profile__data-separator" />
        <div className="profile__data-line">
          <p className="profile__data-text">E-mail</p>
          <input
            className="profile__data-field"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="profile__bottom-buttons">
          <button
            className="profile__edit-button"
            htmlFor="edit"
            type="button"
            onClick={handleSubmit}
            disabled={formInvalid || !isChangeHappend || isLoading}
          >
            {!isChangeHappend
              ? "Для редактирования внесите изменения"
              : formInvalid
              ? emailError || nameError
              : isLoading ? "Сохранение...": "Редактировать"}
          </button>
          <button
            className="profile__exit-button"
            onClick={handleExit}
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
