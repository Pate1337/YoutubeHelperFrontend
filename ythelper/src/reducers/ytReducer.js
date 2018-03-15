import youtubeService from '../services/youtube'

const ytReducer = (store = [], action) => {
  switch(action.type) {
    case 'SEARCH':
      console.log('SEARCH ytReducer')
      return action.data
    default:
      console.log('default ytReducer')
      return store
  }
}

export const searchForVideo = (searchObject) => {
  console.log('searchForVideo ytReducer')
  /*Katsotaan hakuehdot tässä. Turha lähettää pyynnön mukana tyhjiä parameterja
  esim. q=. Tässä vaiheessa kuitenkin pelkkää hakukenttää voidaan muuttaa.*/
  const q = searchObject.text
  const query = `part=snippet&q=${q}&type=video&maxResults=50`
  /*Tännekkin voisi olla fiksua laittaa formatLinks metodi*/
  return async (dispatch) => {
    const results = await youtubeService.search(query)
    console.log('Results from youtubeService: ' + results)
    dispatch({
      type: 'SEARCH',
      data: results
    })
  }
}

export default ytReducer
