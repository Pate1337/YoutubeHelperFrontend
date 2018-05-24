import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const getAll = async () => {
  console.log('getAll commentService')
  const response = await axios.get(baseUrl)
  return response.data
}

const getByReceiver = async (id) => {
  console.log('getByReceiver commentService')
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const deleteOneComment = async (id) => {
  console.log('deleteOneComment commentService')
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/' + id
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const setToken = (newToken) => {
  console.log('setToken commentsService')
  token = `bearer ${newToken}`
}

const addComment = async (comment) => {
  console.log('addComment commentservice')
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, comment, config)
  return response.data
}

export default {
  setToken, getAll, addComment, getByReceiver, deleteOneComment
}