import userService from '../services/users'
import linkService from '../services/links'

/*Tän tehtävä on vaan palauttaa suosikit ja playlistit aina kun kutsutaan.
Mitään ei tarvi täällä lisätä, koska hakee kaiken tietokannasta.*/
const userLinksReducer = (store = { favourites: [], playlists: [] }, action) => {
  switch(action.type) {
    case 'GET_ALL':
      console.log('GET_ALL userLinksReducer')
      return action.data
    case 'REMOVE':
      console.log('REMOVE userLinksReducer')
      return { favourites: [], playlists: [] }
    case 'ADD_LINK_TO_PLAYLIST':
      console.log('ADD_LINK_TO_PLAYLIST userLinksReducer')
      /*Etsitään muokattu playlisti playlistId:n perusteella.*/
      let oldPlaylists = []
      let modifiedPlaylist = []
      store.playlists.forEach(p => {
        if (p._id === action.playlistId) {
          modifiedPlaylist.push(p)
        } else {
          oldPlaylists.push(p)
        }
      })
      return {
        favourites: store.favourites,
        playlists: [...oldPlaylists, {...modifiedPlaylist[0], links: [...modifiedPlaylist[0].links, action.data]}]
      }
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

export const addLinkToPlaylist = (linkObject, playlistId) => {
  console.log('addLinkToPlaylist userLinksReducer')
  return async (dispatch) => {
    try {
      const link = await linkService.addLinkToPlaylist(linkObject, playlistId)
      dispatch({
        type: 'ADD_LINK_TO_PLAYLIST',
        data: link,
        playlistId: playlistId
      })
    } catch (exception) {
      return 'error'
    }
  }
}

export default userLinksReducer
