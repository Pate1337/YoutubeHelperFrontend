import axios from 'axios'
const baseUrl = '/api/links'
/*Lisätään linkki aina joko favouriteLinkiksi tai playlistLinkiksi.
Baseurliin laitetaan siis joko /favourites tai /playlists jossa samaan tapaan
lisätään ensin linkki, muutta
sitten se asetetaan käyttäjän playlist kenttään. Tämän pyynnön mukana pitää
määrittää onko kyseessä uusi playlist vai jo olemassa oleva.*/

let token = null

const getAll = async () => {
  console.log('getAll linkService')
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  console.log('setToken linkService')
  token = `bearer ${newToken}`
}

const createAndAddLinkToUserFavourites = async (newObject) => {
  /*newObject tarvii kentät title, url ja linkId*/
  console.log('createAndAddLinkToUserFavourites linkService')
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/favourites'
  const response = await axios.post(url, newObject, config)
  return response.data
}

export default { getAll, setToken, createAndAddLinkToUserFavourites }
