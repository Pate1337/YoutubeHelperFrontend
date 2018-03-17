import userService from '../services/users'

/*Tän tehtävä on vaan palauttaa suosikit aina kun kutsutaan.
Mitään ei tarvi täällä lisätä, koska hakee kaiken tietokannasta.*/
const favouriteLinksReducer = (store = [], action) => {
  switch(action.type) {
    case 'GET_FAVOURITES':
      console.log('GET_FAVOURITES favouriteLinksReducer')
      return action.data
    case 'REMOVE':
      console.log('REMOVE favouriteLinksReducer')
      return []
    default:
      return store
  }
}

export const usersFavourites = () => {
  console.log('usersFavourites favouriteLinksReducer')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const user = await userService.getUserById(loggedUser.id)
      console.log('user: ' + user)
      dispatch({
        type: 'GET_FAVOURITES',
        data: user.links
      })
    }
  }
}

export const removeFavourites = () => {
  console.log('removeFavourites favouriteLinksReducer')
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE'
    })
  }
}

export default favouriteLinksReducer
