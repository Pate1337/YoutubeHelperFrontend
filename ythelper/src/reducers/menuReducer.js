const menuReducer = (state = window.location.pathname, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
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
