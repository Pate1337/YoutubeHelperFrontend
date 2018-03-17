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

const addUser = async (newUser) => {
  console.log('addUser userService')
  const response = await axios.post(baseUrl, newUser)

  return response.data
}

export default { getAll, getUserById, addUser }
