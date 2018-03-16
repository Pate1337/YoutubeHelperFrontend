import axios from 'axios'
const baseUrl = '/api/links'

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

const createAndAddLinkToUser = async (newObject) => {
  /*newObject tarvii kentät title, url ja linkId*/
  console.log('createAndAddLinkToUser linkService')
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, createAndAddLinkToUser }
