const videoPlayingReducer = (store = { link: null, playerPlaying: false }, action) => {
  switch (action.type) {
    case 'SET_PLAYING_VIDEO':
      return {
        link: action.data,
        playerPlaying: true
      }
    case 'CLEAR_VIDEO':
      return {
        link: null,
        playerPlaying: false
      }
    default:
      return store
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

export const clearPlayingVideo = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_VIDEO'
    })
  }
}

export default videoPlayingReducer
