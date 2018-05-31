import axios from 'axios'
const baseUrl = 'https://www.googleapis.com/youtube/v3'
const key = 'AIzaSyDHoWL_1wl8n14ugcKkRSz-TsycxEy0mvo'

const search = async (query) => {
  const response = await axios.get(`${baseUrl}/${query}&key=${key}`)
  return response.data
}

export default { search }
