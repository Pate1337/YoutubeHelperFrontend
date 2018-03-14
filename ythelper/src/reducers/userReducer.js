import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      console.log('Initiate users userReducer')
      return action.data
    default:
      console.log('default in userReducer')
      return store
  }
}

export const usersInitialization = () => {
  console.log('usersInitialization in userReducer')
  /*Eli tuo links pitää kokeilla miten toimii, koska ilmeisesti ei pysty laittamaan
  links: [{link1}, {link2}, {link3}, ...]*/
  const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      links: user.links
    }
  }

  return async (dispatch) => {
    console.log('Tänne asti päästään')
    const users = await userService.getAll()
    console.log('Käyttäjät userReducerissa')
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

export default userReducer
