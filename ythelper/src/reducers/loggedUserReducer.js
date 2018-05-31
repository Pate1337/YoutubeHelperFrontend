import loginService from '../services/login'
import linkService from '../services/links'
import commentService from '../services/comments'

const loggedUserReducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_LOGGED':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const addLoggedUser = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      /*Tässä userilla on nyt kentät token, username, name, id*/
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      linkService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      return "error"
    }
  }
}

export const loggedUserInitialization = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      linkService.setToken(user.token)
      commentService.setToken(user.token)
      dispatch({
        type: 'INIT_LOGGED',
        data: user
      })
    }
  }
}

export const removeLoggedUser = () => {
  window.localStorage.removeItem('loggedUser')
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loggedUserReducer
