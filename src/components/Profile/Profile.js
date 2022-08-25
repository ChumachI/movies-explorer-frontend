import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import CurrentUserContext from "../../utils/context/currentUserContext";
import "./Profile.css";
function Profile({ handleExit, handleSubmitUserForm, handleChange, name, email, emailError, nameError }) {

  const currentUser = useContext(CurrentUserContext);
  const[isChangeHappend, setChangeHappend] = useState(false);
  const [forminvalid, setFormInvalid] = useState(false);

  useEffect(() => {
    if ( emailError || nameError) {
      setFormInvalid(true);
    } else {
      setFormInvalid(false);
    }
  }, [emailError, nameError, name, email]);


  useEffect(()=>{
    if(email !== currentUser.email){
      setChangeHappend(true);
    }
    if(name !== currentUser.name){
      setChangeHappend(true);
    }
  },[email,name, currentUser])


  return (
    <section className="profile">
      <h1 className="profile__header">Привет, {name}!</h1>
      <form className="profile__data">
        <div className="profile__data-line">
          <p className="profile__data-text">Имя</p>
          <input className="profile__data-field" name="name" value = {name} onChange={handleChange}/>
        </div>
        <hr className="profile__data-separator" />
        <div className="profile__data-line">
          <p className="profile__data-text">E-mail</p>
          <input className="profile__data-field" name="email" value = {email} onChange={handleChange}/>
        </div>
      </form>
      <div className="profile__bottom-buttons">
        <button className="profile__bottom-button" type="button" onClick={handleSubmitUserForm} disabled={!isChangeHappend && forminvalid}>
          { 'Редактировать'}
        </button>
        <button
          className="profile__bottom-button profile__bottom-button_color_red"
          onClick={handleExit}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
