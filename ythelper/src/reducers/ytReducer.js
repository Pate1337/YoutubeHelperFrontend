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
  /*formatItemissä nyt vaan pari hassua kohtaa*/
  const formatItem = (item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title
    }
  }
  return async (dispatch) => {
    const result = await youtubeService.search(query)
    console.log('Results from youtubeService: ' + result.items[0].snippet.title)
    const items = result.items
    const formattedItems = items.map(i => formatItem(i))
    /*Pakko pitää JSONina statessa, koska object oliona ei mahdollista*/
    dispatch({
      type: 'SEARCH',
      data: JSON.stringify(formattedItems)
    })
  }
}

export default ytReducer
