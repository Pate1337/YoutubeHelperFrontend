const playlistPlayingReducer = (state = { playlist: null, hidden: false, index: 0, playedOnce: false }, action) => {
  switch(action.type) {
    case 'INIT_PLAYLIST':
      console.log('INIT_PLAYLIST playlistPlayingReducer')
      return {
        playlist: action.data,
        hidden: false,
        index: 0,
        playedOnce: true
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
        hidden: state.hidden,
        index: state.index,
        playedOnce: true
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
        hidden: state.hidden,
        index: index,
        playedOnce: true
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
        hidden: state.hidden,
        index: indx,
        playedOnce: true
      }
    case 'PLAY':
      console.log('PLAY playlistPlayingReducer')
      return {
        playlist: state.playlist,
        hidden: state.hidden,
        index: action.index,
        playedOnce: true
      }
    case 'HIDE_PLAYER':
      console.log('HIDE_PLAYER playlistPlayingReducer')
      return {
        playlist: state.playlist,
        hidden: true,
        index: state.index,
        playedOnce: true
      }
    case 'SHOW_PLAYER':
      console.log('SHOW_PLAYER playlistPlayingReducer')
      return {
        playlist: state.playlist,
        hidden: false,
        index: state.index,
        playedOnce: true
      }
    case 'ADD_LINK':
      console.log('ADD_LINK playlistPlayingReducer')
      let moddedPlaylist = {...state.playlist, links: [...state.playlist.links, action.data]}
      return {
        playlist: moddedPlaylist,
        hidden: false,
        index: state.index,
        playedOnce: true
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
        hidden: state.hidden,
        index: random,
        playedOnce: true
      }
    default:
      console.log('default playlistPlayingReducer')
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

export const hidePlayer = () => {
  console.log('hidePlayer playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'HIDE_PLAYER'
    })
  }
}

export const showPlayer = () => {
  console.log('showPlayer playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_PLAYER'
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

export default playlistPlayingReducer
