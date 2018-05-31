import axiosJSONP from 'axios-jsonp-pro'
const baseUrl = 'https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1'
const key = 'AIzaSyDHoWL_1wl8n14ugcKkRSz-TsycxEy0mvo'

const search = async (query) => {
  const response = await axiosJSONP.jsonp(`${baseUrl}&q=${query}&key=${key}&format=5&alt=json`)
  return response
}

export default { search }
