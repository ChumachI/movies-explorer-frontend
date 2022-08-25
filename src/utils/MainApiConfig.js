
const MainApiConfig = {
    commonUrlPart: 'https://api.movies.chumak.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("jwt"),
      }
}
export { MainApiConfig }
