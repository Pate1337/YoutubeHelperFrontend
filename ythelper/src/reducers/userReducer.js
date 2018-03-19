import userService from '../services/users'
/*Eli täällä on nyt mun mielestä semmonen tilanne, että initialisoinnin
jälkeen, täällä on kaikki käyttäjät siinä muodossa, että tiedot näkyy
mutta linkkien ja playlistien kohdalla näkyy vaan id:t. Eli ei
populointia. Tälläsenä sen voi pitää. userLinksReducer pitää sitten
kirjaa kirjautuneen käyttäjän suosikeista ja soittolistoista paljon
tarkempaa kirjaa, siellä kaikki on populoitu.*/

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
      console.log('default in userReducer')
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
