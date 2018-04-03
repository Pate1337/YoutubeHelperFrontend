const videoPlayingReducer = (store = { link: {_id: '123', title: 'testi', thumbnail: 'juu', linkId: '1d28Amj7WiQ'}, playerPaused: true, hiddenPaused: true, currentTime: 0, hiddenPlayerTarget: null, playerTarget: null, playerPlaying: false }, action) => {
  switch (action.type) {
    case 'SET_HIDDEN_PLAYER_TARGET':
      return {
        link: store.link,
        playerPaused: store.playerPaused,
        hiddenPaused: store.hiddenPaused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: action.data,
        playerTarget: store.playerTarget,
        playerPlaying: store.playerPlaying
      }
    case 'SET_PLAYER_TARGET':
      return {
        link: store.link,
        playerPaused: store.playerPaused,
        hiddenPaused: store.hiddenPaused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: action.data,
        playerPlaying: store.playerPlaying
      }
    case 'SHOW_PLAYER':
      const currentTimeOnHidden = store.hiddenPlayerTarget.getCurrentTime()
      store.playerTarget.seekTo(currentTimeOnHidden)
      if (!store.hiddenPaused) {
        store.hiddenPlayerTarget.pauseVideo()
        store.playerTarget.playVideo()
      }
      return {
        link: store.link,
        playerPaused: false,
        hiddenPaused: true,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: true
      }
    case 'HIDE_PLAYER':
      const currentTimeOnPlayer = store.playerTarget.getCurrentTime()
      store.hiddenPlayerTarget.seekTo(currentTimeOnPlayer)
      if (!store.playerPaused) {
        store.playerTarget.pauseVideo()
        store.hiddenPlayerTarget.playVideo()
      }
      return {
        link: store.link,
        playerPaused: true,
        hiddenPaused: false,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: false
      }
    case 'SET_PLAYING_VIDEO':
      return {
        link: action.data,
        playerPaused: false,
        hiddenPaused: true,
        currentTime: 0,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: true
      }
    case 'SET_PLAYER_PAUSED':
      return {
        link: store.link,
        playerPaused: true,
        hiddenPaused: store.hiddenPaused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: store.playerPlaying
      }
    case 'SET_PLAYER_PLAYING':
      return {
        link: store.link,
        playerPaused: false,
        hiddenPaused: store.hiddenPaused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: store.playerPlaying
      }
    case 'SET_HIDDEN_PAUSED':
      return {
        link: store.link,
        playerPaused: store.playerPaused,
        hiddenPaused: true,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: store.playerPlaying
      }
    case 'SET_HIDDEN_PLAYING':
      return {
        link: store.link,
        playerPaused: store.playerPaused,
        hiddenPaused: false,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: store.playerPlaying
      }
    default:
      return store
  }
}

export const setHiddenPlayerTarget = (target) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_HIDDEN_PLAYER_TARGET',
      data: target
    })
  }
}

export const setPlayerTarget = (target) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_TARGET',
      data: target
    })
  }
}

export const showPlayerAndHide = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_PLAYER'
    })
  }
}

export const showPlayerBarAndHide = () => {
  return async (dispatch) => {
    dispatch({
      type: 'HIDE_PLAYER'
    })
  }
}

export const setPlayingVideo = (video) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYING_VIDEO',
      data: video
    })
  }
}

export const setPlayerPaused = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_PAUSED'
    })
  }
}

export const setPlayerPlaying = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_PLAYING'
    })
  }
}

export const setHiddenPaused = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_HIDDEN_PAUSED'
    })
  }
}

export const setHiddenPlaying = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_HIDDEN_PLAYING'
    })
  }
}

export default videoPlayingReducer
