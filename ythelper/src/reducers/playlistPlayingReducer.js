const playlistPlayingReducer = (state = { playerPlaying: true, playlist: null, index: 0, needSeek: false, playedOnce: false, currentTime: 0, startTime: 0 }, action) => {
  switch(action.type) {
    case 'INIT_PLAYLIST':
      console.log('INIT_PLAYLIST playlistPlayingReducer')
      return {
        playlist: action.data,
        index: 0,
        needSeek: false,
        playedOnce: true,
        playerPlaying: true,
        currentTime: 0,
        startTime: 0
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
        index: state.index,
        needSeek: state.needSeek,
        playedOnce: true,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
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
        index: index,
        needSeek: state.needSeek,
        playedOnce: true,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
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
        needSeek: state.needSeek,
        index: indx,
        playedOnce: true,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    case 'PLAY':
      console.log('PLAY playlistPlayingReducer')
      return {
        playlist: state.playlist,
        needSeek: state.needSeek,
        index: action.index,
        playedOnce: true,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    /*Tätä kutsutaan, kun halutaan laittaa palkki soimaan*/
    case 'HIDE_PLAYER':
      console.log('HIDE_PLAYER playlistPlayingReducer')
      return {
        playlist: state.playlist,
        needSeek: state.needSeek,
        index: state.index,
        playedOnce: true,
        playerPlaying: false,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    case 'SHOW_PLAYER':
      console.log('SHOW_PLAYER playlistPlayingReducer')
      return {
        playlist: state.playlist,
        needSeek: state.needSeek,
        index: state.index,
        playedOnce: true,
        playerPlaying: true,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    case 'ADD_LINK':
      console.log('ADD_LINK playlistPlayingReducer')
      let moddedPlaylist = {...state.playlist, links: [...state.playlist.links, action.data]}
      return {
        playlist: moddedPlaylist,
        needSeek: state.needSeek,
        index: state.index,
        playedOnce: true,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
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
        needSeek: state.needSeek,
        index: random,
        playedOnce: true,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    case 'SET_TIME':
      return {
        playlist: state.playlist,
        needSeek: state.needSeek,
        index: state.index,
        playedOnce: state.playedOnce,
        playerPlaying: state.playerPlaying,
        currentTime: action.currentTime,
        startTime: action.startTime
      }
    case 'NEED_SEEK':
      return {
        playlist: state.playlist,
        needSeek: true,
        index: state.index,
        playedOnce: state.playedOnce,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    case 'SEEK_DONE':
      return {
        playlist: state.playlist,
        needSeek: false,
        index: state.index,
        playedOnce: state.playedOnce,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
      }
    /*case 'PLAYING':
      return {
        playlist: state.playlist,
        hidden: state.hidden,
        index: state.index,
        playedOnce: state.playedOnce,
        playing: true
      }*/
    case 'CLEAR':
      return {
        playlist: null,
        needSeek: state.needSeek,
        index: state.index,
        playedOnce: state.playedOnce,
        playerPlaying: state.playerPlaying,
        currentTime: state.currentTime,
        startTime: state.startTime
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

export const seekRequired = () => {
  return async (dispatch) => {
    dispatch({
      type: 'NEED_SEEK'
    })
  }
}

export const seekDone = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SEEK_DONE'
    })
  }
}

export const setCurrentTime = (currentTime, startTime) => {
  console.log('setCurrentTime playlistPlayingReducer')
  return async (dispatch) => {
    dispatch({
      type: 'SET_TIME',
      currentTime: currentTime,
      startTime: startTime
    })
  }
}

export const playing = () => {
  return async (dispatch) => {
    dispatch({
      type: 'PLAYING'
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

export const clearPlayingPlaylist = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

export default playlistPlayingReducer
