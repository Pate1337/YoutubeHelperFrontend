import userService from '../services/users'

/*Tän tehtävä on vaan palauttaa suosikit aina kun kutsutaan.
Mitään ei tarvi täällä lisätä, koska hakee kaiken tietokannasta.*/
const userLinksReducer = (store = { favourites: [], playlists: [] }, action) => {
  switch(action.type) {
    case 'GET_ALL':
      console.log('GET_ALL userLinksReducer')
      return action.data
    case 'REMOVE':
      console.log('REMOVE userLinksReducer')
      return { favourites: [], playlists: [] }
    default:
      return store
  }
}

/*Nyt saadaan molemmat hoidettua yhdellä tietokantahaulla!!!*/
export const userLinks = () => {
  console.log('userLinks userLinksReducer')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const user = await userService.getUserById(loggedUser.id)
      console.log('user: ' + user)
      dispatch({
        type: 'GET_ALL',
        data: {
          favourites: user.links,
          playlists: user.playlists
        }
      })
    }
  }
}

export const removeUserLinks = () => {
  console.log('removeUserLinks userLinksReducer')
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE'
    })
  }
}

export default userLinksReducer
