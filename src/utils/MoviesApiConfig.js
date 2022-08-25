
const MainApiConfig = {
    commonUrlPart: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("jwt"),
      }
}
export { MainApiConfig }
