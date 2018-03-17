import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  console.log('getAll userService')
  const response = await axios.get(baseUrl)
  return response.data
}

const getUserById = async (id) => {
  console.log('getUserById userService')
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getUserById }
