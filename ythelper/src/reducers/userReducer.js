import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    case 'NEW_USER':
      return [...store, action.data]
    default:
      return store
  }
}

export const usersInitialization = () => {
  const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      links: user.links,
      playlists: user.playlists
    }
  }

  return async (dispatch) => {
    const users = await userService.getAll()
    let formattedUsers = []
    users.forEach(u => {
      formattedUsers.push(formatUser(u))
    })
    dispatch({
      type: 'INIT_USERS',
      data: formattedUsers
    })
  }
}

export const addNewUser = (userObject) => {
  const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      links: user.links,
      playlists: user.playlists
    }
  }
  return async (dispatch) => {
    try {
      const user = await userService.addUser(userObject)
      const formattedUser = formatUser(user)
      dispatch({
        type: 'NEW_USER',
        data: formattedUser
      })
    } catch (e) {
      return "error"
    }
  }
}

export default userReducer
