import loginService from '../services/login'
import linkService from '../services/links'

const loggedUserReducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_LOGGED':
      console.log('INIT_LOGGED loggedUserReducer')
      return action.data
    case 'LOGIN':
      console.log('LOGIN loggedUserReducer')
      return action.data
    case 'LOGOUT':
      console.log('LOGOUT loggedUserReducer')
      return null
    default:
      console.log('default loggedUserReducer')
      return state
  }
}

export const addLoggedUser = (userObject) => {
  console.log('addLoggedUser loggedUserReducer')
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
      /*Pikkasen tarkempi virheilmoitus pitää tehdä*/
      return "error"
    }
  }
}

export const loggedUserInitialization = () => {
  console.log('loggedUserInitialization loggedUserReducer')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      linkService.setToken(user.token)
      dispatch({
        type: 'INIT_LOGGED',
        data: user
      })
    }
  }
}

export const removeLoggedUser = () => {
  console.log('removeLoggedUser loggedUserReducer')
  window.localStorage.removeItem('loggedUser')
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loggedUserReducer
