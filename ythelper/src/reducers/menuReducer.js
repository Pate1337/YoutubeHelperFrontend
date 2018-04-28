const menuReducer = (state = window.location.pathname, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      console.log('menuReducer active: ' + action.data)
      return action.data
    default:
      console.log('DEFAULTTI menuReducer: ' + state)
      return state
  }
}

export const setActiveItem = (activeItem) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE',
      data: activeItem
    })
  }
}

export default menuReducer
