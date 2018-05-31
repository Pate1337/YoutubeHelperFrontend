import userService from '../services/users'
import linkService from '../services/links'

const userLinksReducer = (store = { favourites: [], playlists: [], relatedLinks: [], randomLinks: [], relatedSort: 'countAsc', favouriteSort: 'none' }, action) => {
  switch(action.type) {
    case 'GET_ALL':
      return action.data
    case 'REMOVE_ALL':
      return { favourites: [], playlists: [], relatedLinks: [], randomLinks: [] }
    case 'REMOVE_LINK':
      let favouritesC = store.favourites.filter( link => link._id !== action.linkId)
      return {
        favourites: favouritesC,
        playlists: store.playlists,
        relatedLinks: store.relatedLinks,
        randomLinks: store.randomLinks
      }
    case 'ADD_FAVOURITE':
      return {
        favourites: [...store.favourites, action.data],
        playlists: store.playlists,
        relatedLinks: store.relatedLinks,
        randomLinks: store.randomLinks
      }
    case 'ADD_LINK_TO_PLAYLIST':
      let playlists = []
      store.playlists.forEach(p => {
        if (p._id === action.playlistId) {
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
        randomLinks: store.randomLinks
      }
      case 'ADD_PLAYLIST':
        return {
          favourites: store.favourites,
          playlists: [...store.playlists, action.data],
          relatedLinks: store.relatedLinks,
          randomLinks: store.randomLinks
        }
    case 'REMOVE_RELATED':
      let newRelatedLinks = []
      store.relatedLinks.forEach(l => {
        if (l.link._id !== action.linkId) {
          newRelatedLinks.push(l)
        }
      })
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: newRelatedLinks,
        randomLinks: store.randomLinks
      }
    case 'ADD_RELATED':
      let addedRelateds = [...store.relatedLinks, ...action.data]
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: addedRelateds,
        randomLinks: store.randomLinks
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
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: updatedRelatedLinks,
        randomLinks: store.randomLinks
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
      return {
        favourites: store.favourites,
        playlists: store.playlists,
        relatedLinks: sortedByNameRelateds,
        randomLinks: store.randomLinks,
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
        randomLinks: store.randomLinks,
        relatedSort: countSort
      }
    case 'DELETE_FROM_PLAYLIST':
      playlists = []
      store.playlists.forEach(p => {
        if (p._id === action.playlist) {
          let newPlaylistLinks = []
          p.links.forEach(plink => {
            if (plink._id !== action.linkId) {
              newPlaylistLinks.push(plink)
            }
          })
          let newPlaylist = {...p, links: newPlaylistLinks}
          playlists.push(newPlaylist)
        } else {
          playlists.push(p)
        }
      })
      return {
        favourites: store.favourites,
        playlists: playlists,
        relatedLinks: store.relatedLinks,
        randomLinks: store.randomLinks
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
      await linkService.deleteLinkFromPlaylist(link._id, playlistId)
      dispatch({
        type: 'DELETE_FROM_PLAYLIST',
        linkId: link._id,
        playlist: playlistId
      })
    } catch (exception) {
      return 'error'
    }
  }
}

export const sortRelatedsByName = () => {
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


export const userLinks = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const user = await userService.getUserById(loggedUser.id)
      let randomLinks = []
      let usedIndexes = []
      if (user.relatedLinks.length > 10) {
        for (let i = 0; i < 10; i++) {
          let randomIndex = null
          while (true) {
            randomIndex = Math.floor(Math.random() * user.relatedLinks.length)
            let found = usedIndexes.find(p => p === randomIndex)
            if (found === undefined) {
              usedIndexes.push(randomIndex)
              break
            }
          }
          let randomLink = user.relatedLinks[randomIndex].link
          randomLinks.push(randomLink)
        }
      } else {
        user.relatedLinks.forEach(l => {
          randomLinks.push(l.link)
        })
      }
      const relatedLinks = user.relatedLinks.sort(sortByCount)
      dispatch({
        type: 'GET_ALL',
        data: {
          favourites: user.links,
          playlists: user.playlists,
          relatedLinks: relatedLinks,
          randomLinks: randomLinks
        }
      })
    }
  }
}

export const removeUserLinks = () => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_ALL'
    })
  }
}

export const removeOneFavouriteLink = (linkId) => {
  return async (dispatch) => {
    try {
      const rmresult = await linkService.deleteOneLinkFromUserFavourites(linkId)
      dispatch({
        type: 'REMOVE_LINK',
        linkId: linkId
      })
    } catch (e) {
      return 'error'
    }

  }
}

export const addLinkToPlaylist = (linkObject, playlistId) => {
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
