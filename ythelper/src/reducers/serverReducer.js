const serverReducer = (state = false, action) => {
  switch(action.type) {
    case 'SERVER_ON_USE':
      return true
    case 'SERVER_FREE':
      return false
    default:
      return state
  }
}

export const serverSetOnUse = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SERVER_ON_USE'
    })
  }
}

export const serverFree = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SERVER_FREE'
    })
  }
}

export default serverReducer
