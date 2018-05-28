const playlistPlayingReducer = (state = { playlist: null, index: 0 }, action) => {
  switch(action.type) {
    case 'INIT_PLAYLIST':
      console.log('INIT_PLAYLIST playlistPlayingReducer')
      return {
        playlist: action.data,
        index: 0
      }
    case 'SHUFFLE_PLAYLIST':
      console.log('SHUFFLE_PLAYLIST playlistPlayingReducer')
      console.log('state.index: ' + state.index)
      let links = state.playlist.links
      let i
      let j
      let temp
      for (i = links.length - 1; i > 0; i--) {
        if (i !== state.index) {
          j = Math.floor(Math.random() * (i + 1))
          while (j === state.index) {
            j = Math.floor(Math.random() * (i + 1))
          }
          /*Ei siis muuteta links[state.index] paikkaa, eikä laiteta
          mitään paikalle links[state.index]*/
          temp = links[i]
          links[i] = links[j]
          links[j] = temp
        }
      }
      let newPlaylist = {...state.playlist, links: links}
      return {
        playlist: newPlaylist,
        index: state.index
      }
    case 'PLAY_NEXT':
      console.log('PLAY_NEXT playlistPlayingReducer')
      let index
      if (state.index === state.playlist.links.length - 1) {
        index = 0
      } else {
        index = state.index + 1
      }
      return {
        playlist: state.playlist,
        index: index
      }
    case 'PLAY_PREV':
      console.log('PLAY_PREV playlistPlayingReducer')
      let indx
      if (state.index === 0) {
        indx = state.playlist.links.length - 1
      } else {
        indx = state.index - 1
      }
      return {
        playlist: state.playlist,
        index: indx
      }
    case 'PLAY':
      console.log('PLAY playlistPlayingReducer')
      return {
        playlist: state.playlist,
        index: action.index
      }
    case 'ADD_LINK':
      console.log('ADD_LINK playlistPlayingReducer')
      let moddedPlaylist = {...state.playlist, links: [...state.playlist.links, action.data]}
      return {
        playlist: moddedPlaylist,
        index: state.index
      }
    case 'PLAY_RANDOM':
      console.log('PLAY_RANDOM playlistPlayingReducer')
      let random = Math.floor(Math.random() * state.playlist.links.length)
      if (state.playlist.links.length >= 2) {
        while (random === state.index) {
          random = Math.floor(Math.random() * state.playlist.links.length)
        }
      }
      return {
        playlist: state.playlist,
        index: random
      }
    case 'CLEAR_PLAYLIST':
      return {
        playlist: null,
        index: state.index
      }
    case 'DELETE_FROM_PLAYING_PLAYLIST':
      let newPlaylistLinks = []
      i = 0
      let indexOfRemoved = 0
      state.playlist.links.forEach(l => {
        if (l._id !== action.data) {
          newPlaylistLinks.push(l)
        } else {
          console.log('Tämä poistetaan: ' + l.title)
          indexOfRemoved = i
        }
        i++
      })
      newPlaylist = {...state.playlist, links: newPlaylistLinks}
      let newIndex = 0
      if (indexOfRemoved < state.index) {
        newIndex = state.index - 1
      } else if (indexOfRemoved > state.index) {
        newIndex = state.index
      } else {
        console.log('Poistettiin soitettava linkki...')
        newIndex: 0
      }
      console.log('Indeksi on: ' + newIndex)
      return {
        playlist: newPlaylist,
        index: newIndex
      }
    default:
      return state
  }
}

export const playRandom = () => {
  console.log('playRandom playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'PLAY_RANDOM'
    })
  }
}

export const deleteFromPlayingPlaylist = (link) => {
  return async (dispatch) => {
    dispatch({
      type: 'DELETE_FROM_PLAYING_PLAYLIST',
      data: link._id
    })
  }
}


export const initPlayingPlaylist = (playlistObject) => {
  console.log('initPlayingPlaylist playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'INIT_PLAYLIST',
      data: playlistObject
    })
  }
}

export const shufflePlaylist = () => {
  console.log('shufflePlaylist playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'SHUFFLE_PLAYLIST'
    })
  }
}

export const playNext = () => {
  console.log('playNext playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'PLAY_NEXT'
    })
  }
}

export const playPrevious = () => {
  console.log('playPrevious playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'PLAY_PREV'
    })
  }
}

export const play = (index) => {
  console.log('play playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'PLAY',
      index: index
    })
  }
}

export const addToPlayingPlaylist = (linkObject) => {
  console.log('addToPlayingPlaylist playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'ADD_LINK',
      data: linkObject
    })
  }
}

export const clearPlayingPlaylist = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_PLAYLIST'
    })
  }
}

export default playlistPlayingReducer
