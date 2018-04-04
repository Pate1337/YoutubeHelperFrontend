import userService from '../services/users'
import linkService from '../services/links'

/*Täällä on nyt ongelmia! Aaaa, tätyy jättää formatoimatta backissa
playlistin lisäyksessä, suosikin lisäyksessa ja uuden linkin lisäyksessä
soittolistalle! Nyt pitäis kaikki olla kunnossa.*/
const userLinksReducer = (store = { favourites: [], playlists: [], relatedLinks: [], randomLink: null }, action) => {
  switch(action.type) {
    case 'GET_ALL':
      console.log('GET_ALL userLinksReducer')
      return action.data
    case 'REMOVE':
      console.log('REMOVE userLinksReducer')
      return { favourites: [], playlists: [], relatedLinks: [], randomLink: null }
    case 'REMOVE_LINK':
      console.log('REMOVE_LINK userLinksReducer')
      let favouritesC = store.favourites.filter( link => link._id != action.linkId)
      return {
        favourites: favouritesC,
        playlists: store.playlists,
        relatedLinks: store.relatedLinks,
        randomLink: store.randomLink
      }
    case 'ADD_FAVOURITE':
      console.log('ADD_FAVOURITE userLinksReducer')
      return {
        favourites: [...store.favourites, action.data],
        playlists: store.playlists,
        relatedLinks: store.relatedLinks,
        randomLink: store.randomLink
      }
    case 'ADD_LINK_TO_PLAYLIST':
      console.log('ADD_LINK_TO_PLAYLIST userLinksReducer')
      /*Etsitään muokattu playlisti playlistId:n perusteella.*/
      /*Jotta soittolista toimis kivasti, niin pitäis saada järjestys pysyyn
      samana*/
      let playlists = []
      store.playlists.forEach(p => {
        if (p._id === action.playlistId) {
          /*Tätä muokataan*/
          let newPlaylist = {...p, links: [...p.links, action.data]}
          playlists.push(newPlaylist)
        } else {
          playlists.push(p)
        }
      })
      return {
        favourites: store.favourites,
        playlists: playlists,
        relatedLinks: store.relatedLinks,
        randomLink: store.randomLink
      }
      case 'ADD_PLAYLIST':
        console.log('ADD_PLAYLIST userLinksReducer')
        console.log('action.data: ' + action.data._id + action.data.title)
        return {
          favourites: store.favourites,
          playlists: [...store.playlists, action.data],
          relatedLinks: store.relatedLinks,
          randomLink: store.randomLink
        }
      case 'SHUFFLE_PLAYLIST':
        console.log('SHUFFLE_PLAYLIST userLinksReducer')
        /*Etsitään soittolista ja muokataan tietyn soittolistan linkkejä*/
        let plists = []
        store.playlists.forEach(p => {
          if (p._id === action.playlistId) {
            /*Tätä muokataan. Fisher-Yates Shuffling Algorithm.*/
            let links = p.links
            let i
            let j
            let temp
            for (i = links.length - 1; i > 0; i--) {
              j = Math.floor(Math.random() * (i + 1))
              temp = links[i]
              links[i] = links[j]
              links[j] = temp
            }
            let newPlaylist = {...p, links: links}
            plists.push(newPlaylist)
          } else {
            plists.push(p)
          }
        })
      return {
        favourites: store.favourites,
        playlists: plists,
        relatedLinks: store.relatedLinks,
        randomLink: store.randomLink
      }
    case 'REMOVE_RELATED':
      console.log('REMOVE RELATED userLinksService')
      let newRelatedLinks = []
      store.relatedLinks.forEach(l => {
        if (l.link._id !== action.linkId) {
          newRelatedLinks.push(l)
        }
      })
    /*  let newRandomLink = store.randomLink
      if (store.randomLink._id === action.linkId) {
        const randomIndex = Math.floor(Math.random() * newRelatedLinks.length)
        newRandomLink = newRelatedLinks[randomIndex].link
        console.log('UUS RANDOM LINKKI ON : ' + newRandomLink.title)
      }*/
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: newRelatedLinks,
        randomLink: store.randomLink
      }
    case 'ADD_RELATED':
      console.log('ACTION DATA kun lisätään related linkit: ' + action.data)
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: [...store.relatedLinks, ...action.data],
        randomLink: store.randomLink
      }
    case 'UPDATE_COUNT':
      let updatedRelatedLinks = []
      store.relatedLinks.forEach(rl => {
        let found = action.links.find(l => l === rl._id)
        if (found !== undefined) {
          updatedRelatedLinks.push({...rl, count: rl.count + 1})
        } else {
          updatedRelatedLinks.push(rl)
        }
      })
      /*let updatedRelatedLinks = []
      store.relatedLinks.forEach(l => {
        if (l._id === action.linkId) {
          let newLink = {...l, count: l.count + 1}
          updatedRelatedLinks.push(newLink)
        } else {
          updatedRelatedLinks.push(l)
        }
      })*/
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: updatedRelatedLinks,
        randomLink: store.randomLink
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
      const randomIndex = Math.floor(Math.random() * user.relatedLinks.length)
      const randomLink = user.relatedLinks[randomIndex].link
      console.log('RANDOMLINK ALUSSA: ' + randomLink.title)
      dispatch({
        type: 'GET_ALL',
        data: {
          favourites: user.links,
          playlists: user.playlists,
          relatedLinks: user.relatedLinks,
          randomLink: randomLink
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

export const removeOneFavouriteLink = (linkId) => {
  console.log('removeOneFavouriteLink userLinksReducer')
  return async (dispatch) => {
    try {
      const rmresult = await linkService.deleteOneLinkFromUserFavourites(linkId)
      console.log('Linkki on poistettu')
      dispatch({
        type: 'REMOVE_LINK',
        linkId: linkId
      })
    } catch (e) {
      return 'error removing the link from favorites'
    }

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

export const removeRelatedFromUser = (linkId) => {
  return async (dispatch) => {
    try {
      await linkService.removeLinkFromRelated(linkId)
      dispatch({
        type: 'REMOVE_RELATED',
        linkId: linkId
      })
    } catch (exception) {
      return 'error'
    }
  }
}

export const addToUserRelated = (linkObjects) => {

  return async (dispatch) => {
    try {
      const links = await linkService.addLinksToRelated(linkObjects)
      console.log('addToUserRelated links.length: ' + links.length)
      dispatch({
        type: 'ADD_RELATED',
        data: links
      })
    } catch (exception) {
      return 'error'
    }
  }
}

export const shufflePlaylist = (playlistId) => {
  console.log('shufflePlaylist userLinksReducer')
  return async (dispatch) => {
    dispatch({
      type: 'SHUFFLE_PLAYLIST',
      playlistId: playlistId
    })
  }
}

export const updateRelatedCount = (relatedLinkObjects) => {
  return async (dispatch) => {
    try {
      let newObjects = []
      for (let i = 0; i < relatedLinkObjects.length; i++) {
        let newObject = {...relatedLinkObjects[i], count: relatedLinkObjects[i].count + 1}
        const updatedLink = await linkService.updateRelatedCount(newObject)
        newObjects.push(updatedLink._id)
        console.log('Päivitetty linkki')
      }
      /*relatedLinkObjects.forEach(rl => {
        let newObject = {...rl, count: rl.count + 1}
        const updatedLink = await linkService.updateRelatedCount(newObject)
        newObjects.push(updatedLink._id)
      })*/
      dispatch({
        type: 'UPDATE_COUNT',
        links: newObjects
      })
      /*const newObject = {...relatedLinkObject, count: relatedLinkObject.count + 1}
      const updatedLink = await linkService.updateRelatedCount(newObject)
      dispatch({
        type: 'UPDATE_COUNT',
        linkId: updatedLink._id
      })*/
    } catch (exception) {
      return 'error'
    }
  }
}

export default userLinksReducer
