const notificationReducer = (state = {header: null, content: null, type: null, show: false}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      if (state.header === action.data) {
        return {
          header: null,
          content: null,
          type: null,
          show: false
        }
      }
    default:
      return state
  }
}

export const setNotification = (header, content, type) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        header: header,
        content: content,
        type: type,
        show: true
      }
    })
  }
}

export const hideNotification = (header) => {
  /*header kertoo mikä notificaatio*/
  return async (dispatch) => {
    dispatch({
      type: 'HIDE_NOTIFICATION',
      data: header
    })
  }
}

export default notificationReducer
