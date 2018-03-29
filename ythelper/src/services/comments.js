import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const getAll = async () => {
  console.log('getAll commentService')
  const response = await axios.get(baseUrl)
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
  setToken, getAll, addComment
}