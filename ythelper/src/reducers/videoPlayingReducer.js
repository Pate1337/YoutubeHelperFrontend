const videoPlayingReducer = (store = { link: {_id: '123', title: 'testi', thumbnail: 'juu', linkId: '1d28Amj7WiQ'}, paused: true, currentTime: 0, hiddenPlayerTarget: null, playerTarget: null, playerPlaying: false }, action) => {
  switch (action.type) {
    case 'SET_HIDDEN_PLAYER_TARGET':
      return {
        link: store.link,
        paused: store.paused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: action.data,
        playerTarget: store.playerTarget,
        playerPlaying: store.playerPlaying
      }
    case 'SET_PLAYER_TARGET':
      return {
        link: store.link,
        paused: store.paused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: action.data,
        playerPlaying: store.playerPlaying
      }
    case 'SHOW_PLAYER':
      store.hiddenPlayerTarget.pauseVideo()
      store.playerTarget.playVideo()
      return {
        link: store.link,
        paused: store.paused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: true
      }
    case 'HIDE_PLAYER':
      store.playerTarget.pauseVideo()
      store.hiddenPlayerTarget.playVideo()
      return {
        link: store.link,
        paused: store.paused,
        currentTime: store.currentTime,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: false
      }
    case 'SET_PLAYING_VIDEO':
      return {
        link: action.data,
        paused: false,
        currentTime: 0,
        hiddenPlayerTarget: store.hiddenPlayerTarget,
        playerTarget: store.playerTarget,
        playerPlaying: true
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

export default videoPlayingReducer
