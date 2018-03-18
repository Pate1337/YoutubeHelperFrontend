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
  console.log('url: ' + url)
  const response = await axios.post(url, newObject, config)
  console.log('backendistä saatu response: ' + response)
  return response.data
}

const createPlaylist = async (newObject) => {
  /*Pelkkä title*/
  console.log('createPlaylist linkService')
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.post('/api/playlists', newObject, config)
  return response.data
}

const addLinkToPlaylist = async (newObject, playlistId) => {
  console.log('addLinkToPlaylist linkService')
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.post(`/api/playlists/${playlistId}`, newObject, config)
  return response.data
}

export default { getAll, setToken, createAndAddLinkToUserFavourites,
  createPlaylist, addLinkToPlaylist }
