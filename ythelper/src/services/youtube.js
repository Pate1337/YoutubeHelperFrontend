import axios from 'axios'
const baseUrl = 'https://www.googleapis.com/youtube/v3'
const key = 'AIzaSyDHoWL_1wl8n14ugcKkRSz-TsycxEy0mvo'

const search = async (query) => {
  console.log('search youtubeService')
  /*Olkoon siten, että haun yhteydessä voi määritellä ehtoja, ja ne laitetaan
  haku komponentissa parametrina saatuun queryyn valmiina. Esim
  query='part=snippet&q=toto africa&type=video&maxResults=50'*/
  const response = await axios.get(`${baseUrl}/search?${query}&key=${key}`)
  /*Response on json*/
  console.log('Youtube API:sta saatu response: ' + response.data)
  return response.data
}

export default { search }
