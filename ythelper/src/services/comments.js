import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByReceiver = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const deleteOneComment = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const addComment = async (comment) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, comment, config)
  return response.data
}

export default {
  setToken, getAll, addComment, getByReceiver, deleteOneComment
}
