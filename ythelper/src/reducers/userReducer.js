import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      console.log('Initiate users userReducer')
      return action.data
    //Uusi user, tsekkaa onko tää ihan vituillaan
    case 'NEW_USER':
      console.log('Uuden käyttäjän lisäys userReducer')
      return [...store, action.data]
    default:
      return store
  }
}

export const usersInitialization = () => {
  console.log('usersInitialization in userReducer')
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
  console.log('kutsuttu addNewUseria userReducerissa')
  const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      links: user.links,
      playlists: user.playlists

      //Favorite linkit ?? (ja muut kentät??)
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
