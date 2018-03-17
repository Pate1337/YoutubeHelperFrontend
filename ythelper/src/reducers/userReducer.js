import userService from '../services/users'
import linkService from '../services/links'

const userReducer = (store = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      console.log('Initiate users userReducer')
      return action.data
    case 'ADD_LINK_FOR_USER':
      console.log('ADD_LINK_FOR_USER userReducer')
      let old = []
      let modified = []
      store.forEach(u => {
        if (u.id === action.userId) {
          modified.push(u)
        } else {
          old.push(u)
        }
      })
      /*Nyt siis pelkästään käyttäjän favouritelinkkien tila on päivitetty*/
      return [...old, {...modified[0], links: [...modified[0].links, action.data]}]
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


/*Tää saattais olla fiksumpaa sijoittaa linkReduceriin*/
export const addFavouriteForUser = (linkObject, userId) => {
  console.log('addFavouriteForUser userService')
  /*YTSearchResultissa on jo tarkistettu ettei käyttäjällä ole jo kyseistä
  linkkiä suosikeissa.*/

  return async (dispatch) => {
    const link = await linkService.createAndAddLinkToUserFavourites(linkObject)
    /*Tämän jälkeen tietokantaan on lisätty käyttäjän links kenttään
    tämä uusi linkki. Ja linkkitietokantaan on lisätty kyseinen linkki, jos
    se ei ollut siellä aiemmin.*/
    dispatch({
      type: 'ADD_LINK_FOR_USER',
      data: link,
      userId: userId
    })
  }
}

export default userReducer
