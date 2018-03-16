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

export const addFavouriteForUser = (linkObject) => {
  console.log('addFavouriteForUser userService')
  /*YTSearchResultissa on jo tarkistettu, että linkki ei ole käyttäjän
  suosikeissa.*/
  const link = await linkService.createAndAddLinkToUserFavourites(linkObject)
  /*Tämän jälkeen tietokantaan on lisätty käyttäjän links kenttään
  tämä uusi linkki. Ja linkkitietokantaan on lisätty kyseinen linkki, jos
  se ei ollut siellä aiemmin.*/

  return async (dispatch) => {
    dispatch({
      type: 'ADD_LINK_FOR_USER',
      data: userId
    })
  }
}

export default userReducer
