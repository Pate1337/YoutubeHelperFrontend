import axios from 'axios'
import axiosJSONP from 'axios-jsonp-pro'
var xhr = new XMLHttpRequest();
/*const baseUrl = 'https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&output=youtube'*/
const baseUrl = 'https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1'
/*const baseUrl = 'http://suggestqueries.google.com/complete/search?'*/
const key = 'AIzaSyDHoWL_1wl8n14ugcKkRSz-TsycxEy0mvo'

const search = async (query) => {
  /*const response = await axiosJSONP.jsonp(`${baseUrl}q=${query}&client=youtube&hl=en&ds=yt`)*/
  /*axiosJSONP.jsonp(`${baseUrl}&q=${query}&key=${key}&format=5&alt=json`)
    .then((response) => {
      console.log('response.data: ' + JSON.stringify(response))
      return JSON.stringify(response)
    })*/
  const response = await axiosJSONP.jsonp(`${baseUrl}&q=${query}&key=${key}&format=5&alt=json`)
  return response
  /*const response = await axios.get(`${baseUrl}&q=${query}&key=${key}&format=5&alt=json`)*/
  /*return response.data*/
}

export default { search }

/*https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&q=yolo&key=AIzaSyDHoWL_1wl8n14ugcKkRSz-TsycxEy0mvo&format=5&output=youtube*/
