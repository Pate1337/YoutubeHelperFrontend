import userService from '../services/users'

const playlistsReducer = (store = [], action) => {
  switch(action.type) {
    case 'GET_PLAYLISTS':
      console.log('GET_PLAYLISTS playlistsReducer')
      return action.data
    case 'REMOVE':
      console.log('REMOVE playlistsReducer')
      return []
    default:
      return store
  }
}

export const usersPlaylists = () => {
  console.log('usersPlaylists playlistsReducer')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const user = await userService.getUserById(loggedUser.id)
      console.log('user: ' + user)
      dispatch({
        type: 'GET_PLAYLISTS',
        data: user.playlists
      })
    }
  }
}

export const removePlaylists = () => {
  console.log('removePlaylists playlistsReducer')
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE'
    })
  }
}

export default playlistsReducer
