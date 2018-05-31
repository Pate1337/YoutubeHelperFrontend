import axios from 'axios'
const baseUrl = '/api/links'
let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createAndAddLinkToUserFavourites = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/favourites'
  const response = await axios.post(url, newObject, config)
  return response.data
}

const deleteOneLinkFromUserFavourites = async (linkId) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/favourites'
  const response = await axios.delete(url, {data: {id: linkId, usertoken: token}}, config)
  return response.data
}

const createPlaylist = async (newObject) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.post('/api/playlists', newObject, config)
  return response.data
}

const addLinkToPlaylist = async (newObject, playlistId) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.post(`/api/playlists/${playlistId}`, newObject, config)
  return response.data
}

const addLinksToRelated = async (linkObjects) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.post('/api/relateds', linkObjects, config)
  return response.data
}

const removeLinkFromRelated = async (linkId) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.delete(`/api/relateds/${linkId}`, config)
  return response.data
}

const deleteLinkFromPlaylist = async (linkId, playlistId) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const response = await axios.delete(`/api/playlists/${playlistId}/${linkId}`, config)
  return response.data
}

const updateRelatedCount = async (relatedLinkObject) => {
  const response = await axios.put('/api/relateds/', relatedLinkObject)
  return response.data
}

export default { getAll, setToken, createAndAddLinkToUserFavourites,
  createPlaylist, addLinkToPlaylist, addLinksToRelated, removeLinkFromRelated,
  deleteOneLinkFromUserFavourites, updateRelatedCount, deleteLinkFromPlaylist }
