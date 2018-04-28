const menuReducer = (state = 'home', action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      console.log('menuReducer active: ' + action.data)
      return action.data
    default:
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
