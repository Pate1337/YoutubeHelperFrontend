import userService from '../services/users'
import linkService from '../services/links'

/*Täällä on nyt ongelmia! Aaaa, tätyy jättää formatoimatta backissa
playlistin lisäyksessä, suosikin lisäyksessa ja uuden linkin lisäyksessä
soittolistalle! Nyt pitäis kaikki olla kunnossa.*/
const userLinksReducer = (store = { favourites: [], playlists: [] }, action) => {
  switch(action.type) {
    case 'GET_ALL':
      console.log('GET_ALL userLinksReducer')
      return action.data
    case 'REMOVE':
      console.log('REMOVE userLinksReducer')
      return { favourites: [], playlists: [] }
    case 'ADD_FAVOURITE':
      console.log('ADD_FAVOURITE userLinksReducer')
      return {
        favourites: [...store.favourites, action.data],
        playlists: store.playlists
      }
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
      case 'ADD_PLAYLIST':
        console.log('ADD_PLAYLIST userLinksReducer')
        console.log('action.data: ' + action.data.id + action.data.title)
        return {
          favourites: store.favourites,
          playlists: [...store.playlists, action.data]
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

export const addFavouriteForUser = (linkObject) => {
  console.log('addFavouriteForUser userLinksReducer')
  /*YTSearchResultissa on jo tarkistettu ettei käyttäjällä ole jo kyseistä
  linkkiä suosikeissa.*/

  return async (dispatch) => {
    try {
      const link = await linkService.createAndAddLinkToUserFavourites(linkObject)
      dispatch({
        type: 'ADD_FAVOURITE',
        data: link
      })
    } catch (exception) {
      return 'error'
    }
  }
}

export const addPlaylistForUser = (playlistObject) => {
  console.log('addPlaylistForUser userLinksReducer')
  /*Backendi tuskin vielä kunnossa*/
  return async (dispatch) => {
    try {
      const playlist = await linkService.createPlaylist(playlistObject)
      dispatch({
        type: 'ADD_PLAYLIST',
        data: playlist
      })
    } catch (exception) {
      /*Kaikki samaantapaan kuin linkin lisäämienn playlistiin*/
      return 'error'
    }

  }
}

export default userLinksReducer
