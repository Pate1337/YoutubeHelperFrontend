const playlistPlayingReducer = (state = { playlist: null, index: 0 }, action) => {
  switch(action.type) {
    case 'INIT_PLAYLIST':
      return {
        playlist: action.data,
        index: 0
      }
    case 'SHUFFLE_PLAYLIST':
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
      return {
        playlist: state.playlist,
        index: action.index
      }
    case 'ADD_LINK':
      let moddedPlaylist = {...state.playlist, links: [...state.playlist.links, action.data]}
      return {
        playlist: moddedPlaylist,
        index: state.index
      }
    case 'PLAY_RANDOM':
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
        newIndex = 0
      }
      return {
        playlist: newPlaylist,
        index: newIndex
      }
    default:
      return state
  }
}

export const playRandom = () => {
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
  return async (dispatch) => {
    dispatch({
      type: 'INIT_PLAYLIST',
      data: playlistObject
    })
  }
}

export const shufflePlaylist = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SHUFFLE_PLAYLIST'
    })
  }
}

export const playNext = () => {
  return async (dispatch) => {
    dispatch({
      type: 'PLAY_NEXT'
    })
  }
}

export const playPrevious = () => {
  return async (dispatch) => {
    dispatch({
      type: 'PLAY_PREV'
    })
  }
}

export const play = (index) => {
  return async (dispatch) => {
    dispatch({
      type: 'PLAY',
      index: index
    })
  }
}

export const addToPlayingPlaylist = (linkObject) => {
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
