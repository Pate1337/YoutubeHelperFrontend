import youtubeService from '../services/youtube'

const ytReducer = (store = [], action) => {
  switch(action.type) {
    case 'SEARCH':
      console.log('SEARCH ytReducer')
      return action.data
    case 'INIT_RESULTS':
      console.log('INIT_RESULTS ytReducer')
      return action.data
    case 'CLEAR_RESULTS':
      console.log('CLEAR_RESULTS ytReducer')
      return []
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
  const maxResults = searchObject.maxResults
  const query = `part=snippet&q=${q}&type=video&maxResults=${maxResults}`
  /*formatItemissä nyt vaan pari hassua kohtaa*/
  const formatItem = (item) => {
    return {
      linkId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    }
  }
  return async (dispatch) => {
    const result = await youtubeService.search(query)
    const items = result.items
    const formattedItems = items.map(i => formatItem(i))

    /*Tallennetaan localStorageen, jotta hakutulokset säilyvät kun
    sivu refreshataan. Koska näitä ei siis tallenneta missään vaiheessa
    tietokantaan. (siksi localStorage)*/
    window.localStorage.setItem('ytSearchResults', JSON.stringify(formattedItems))

    dispatch({
      type: 'SEARCH',
      data: formattedItems
    })
  }
}

export const searchResultInitialization = () => {
  console.log('searchResultInitialization ytReducer')
  return async (dispatch) => {
    const searchResultsJSON = window.localStorage.getItem('ytSearchResults')
    if (searchResultsJSON) {
      const searchResults = JSON.parse(searchResultsJSON)
      dispatch({
        type: 'INIT_RESULTS',
        data: searchResults
      })
    }
  }
}

export const clearSearchResults = () => {
  console.log('clearSearchResults ytReducer')
  return async (dispatch) => {
    window.localStorage.removeItem('ytSearchResults')
    dispatch({
      type: 'CLEAR_RESULTS'
    })
  }
}

export default ytReducer
