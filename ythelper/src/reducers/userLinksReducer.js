import userService from '../services/users'
import linkService from '../services/links'

const userLinksReducer = (store = { favourites: [], playlists: [], relatedLinks: [], randomLink: null, relatedSort: 'countAsc', favouriteSort: 'none' }, action) => {
  switch(action.type) {
    case 'GET_ALL':
      console.log('GET_ALL userLinksReducer')
      return action.data
    case 'REMOVE_ALL':
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
    case 'REMOVE_RELATED':
      console.log('REMOVE RELATED userLinksService')
      let newRelatedLinks = []
      store.relatedLinks.forEach(l => {
        if (l.link._id !== action.linkId) {
          newRelatedLinks.push(l)
        }
      })
      /*newRelatedLinks.sort(sortByCount)*/
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: newRelatedLinks,
        randomLink: store.randomLink
      }
    case 'ADD_RELATED':
      console.log('ACTION DATA kun lisätään related linkit: ' + action.data)
      let addedRelateds = [...store.relatedLinks, ...action.data]
      /*let sortedAddedRelateds = []*/
      /*if (store.relatedSort === 'countAsc') {
        sortedAddedRelateds = addedRelateds.sort(sortByCount)
      } else if (store.relatedSort === 'countDesc') {
        sortedAddedRelateds = addedRelateds.sort(sortByCount).reverse()
      } else if (store.relatedSort === 'nameAsc') {
        sortedAddedRelateds = addedRelateds.sort(sortByName)
      } else if (store.relatedSort === 'nameDesc') {
        sortedAddedRelateds = addedRelateds.sort(sortByName).reverse()
      }*/
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: addedRelateds,
        randomLink: store.randomLink
      }
    case 'UPDATE_COUNT':
      let updatedRelatedLinks = []
      /*let sortedUpdatedRelatedLinks = []*/
      store.relatedLinks.forEach(rl => {
        let found = action.links.find(l => l === rl._id)
        if (found !== undefined) {
          updatedRelatedLinks.push({...rl, count: rl.count + 1})
        } else {
          updatedRelatedLinks.push(rl)
        }
      })
      /*if (store.relatedSort === 'countAsc') {
        sortedUpdatedRelatedLinks = updatedRelatedLinks.sort(sortByCount)
      } else if (store.relatedSort === 'countDesc') {
        sortedUpdatedRelatedLinks = updatedRelatedLinks.sort(sortByCount).reverse()
      } else if (store.relatedSort === 'nameAsc') {
        sortedUpdatedRelatedLinks = updatedRelatedLinks.sort(sortByName)
      } else if (store.relatedSort === 'nameDesc') {
        sortedUpdatedRelatedLinks = updatedRelatedLinks.sort(sortByName).reverse()
      }*/
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: updatedRelatedLinks,
        randomLink: store.randomLink
      }
    case 'SORT_RELATEDS_BY_NAME':
      let sortedByNameRelateds = []
      let nameSort = null
      if (store.relatedSort === 'nameAsc') {
        sortedByNameRelateds = store.relatedLinks.reverse()
        nameSort = 'nameDesc'
      } else if (store.relatedSort === 'nameDesc') {
        sortedByNameRelateds = store.relatedLinks.reverse()
        nameSort = 'nameAsc'
      } else {
        sortedByNameRelateds = store.relatedLinks.sort(sortByName)
        nameSort = 'nameAsc'
      }
      console.log('KOKO: ' + sortedByNameRelateds.length)
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: sortedByNameRelateds,
        randomLink: store.randomLink,
        relatedSort: nameSort
      }
    case 'SORT_RELATEDS_BY_COUNT':
      let sortedByCountRelateds = []
      let countSort = null
      if (store.relatedSort === 'countAsc') {
        sortedByCountRelateds = store.relatedLinks.reverse()
        countSort = 'countDesc'
      } else if (store.relatedSort === 'countDesc') {
        sortedByCountRelateds = store.relatedLinks.reverse()
        countSort = 'countAsc'
      } else {
        sortedByCountRelateds = store.relatedLinks.sort(sortByCount)
        countSort = 'countAsc'
      }
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: sortedByCountRelateds,
        randomLink: store.randomLink,
        relatedSort: countSort
      }
    case 'DELETE_FROM_PLAYLIST':
      playlists = []
      console.log('action.linkId: ' + action.linkId)
      console.log('action.playlist: ' + action.playlist)
      store.playlists.forEach(p => {
        if (p._id === action.playlist) {
          console.log('Löytyi playlisti. Length: ' + p.links.length)
          /*Tätä muokataan*/
          let newPlaylistLinks = []
          p.links.forEach(plink => {
            if (plink._id !== action.linkId) {
              newPlaylistLinks.push(plink)
            } else {
              console.log('POISTETTAVA LINKKI ON ' + plink._id)
            }
          })
          let newPlaylist = {...p, links: newPlaylistLinks}
          playlists.push(newPlaylist)
          console.log('newPlaylist length: ' + newPlaylist.links.length)
        } else {
          playlists.push(p)
        }
      })
      console.log('playlists.length: ' + playlists.length)
      console.log('DELETE_FROM_PLAYLIST OK')
      return {
        favourites: store.favourites,
        playlists: playlists,
        relatedLinks: store.relatedLinks,
        randomLink: store.randomLink
      }
    default:
      return store
  }
}

const sortByCount = (a, b) => {
  return parseInt(b.count, 10) - parseInt(a.count, 10)
}

const sortByName = (a, b) => {
  let x = a.link.title.toLowerCase()
  let y = b.link.title.toLowerCase()
  return x < y ? -1 : x > y ? 1 : 0
}

export const deleteLinkFromPlaylist = (link, playlistId) => {
  return async (dispatch) => {
    try {
      console.log('Linkserviceä kutsutaan')
      await linkService.deleteLinkFromPlaylist(link._id, playlistId)
      console.log('Poisto on OK')
      dispatch({
        type: 'DELETE_FROM_PLAYLIST',
        linkId: link._id,
        playlist: playlistId
      })
    } catch (exception) {
      console.log('ERRORIA TULI')
      return 'error'
    }
  }
}

export const sortRelatedsByName = () => {
  console.log('sortRelatedsByName REDUCER')
  return async (dispatch) => {
    dispatch({
      type: 'SORT_RELATEDS_BY_NAME'
    })
  }
}

export const sortRelatedsByCount = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SORT_RELATEDS_BY_COUNT'
    })
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
      const relatedLinks = user.relatedLinks.sort(sortByCount)
      dispatch({
        type: 'GET_ALL',
        data: {
          favourites: user.links,
          playlists: user.playlists,
          relatedLinks: relatedLinks,
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
      type: 'REMOVE_ALL'
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
  return async (dispatch) => {
    try {
      const playlist = await linkService.createPlaylist(playlistObject)
      dispatch({
        type: 'ADD_PLAYLIST',
        data: playlist
      })
    } catch (exception) {
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
      dispatch({
        type: 'UPDATE_COUNT',
        links: newObjects
      })
    } catch (exception) {
      return 'error'
    }
  }
}

export default userLinksReducer
