
const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return true
    case 'SET_LOADED':
      return false
    default:
      return state
  }
}

export const setLoading = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING'
    })
  }
}

export const setLoaded = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADED'
    })
  }
}

export default loaderReducer
