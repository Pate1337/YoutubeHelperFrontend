import youtubeService from '../services/youtube'

const ytReducer = (state = {links: [], searching: false}, action) => {
  switch(action.type) {
    case 'SEARCH_YOUTUBE':
      return {
        links: action.data,
        searching: false
      }
    case 'INIT_RESULTS':
      return {
        links: action.data,
        searching: false
      }
    case 'CLEAR_RESULTS':
      return {
        links: [],
        searching: false
      }
    case 'SET_SEARCHING':
      return {
        links: state.links,
        searching: true
      }
    default:
      return state
  }
}

export const setSearching = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SEARCHING'
    })
  }
}

export const searchForVideo = (searchObject) => {
  const q = searchObject.text
  const maxResults = searchObject.maxResults
  const query = `search?part=snippet&q=${q}&type=video&maxResults=${maxResults}`
  const formatItem = (item) => {
    return {
      linkId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      published: item.snippet.publishedAt
    }
  }
  return async (dispatch) => {
    const result = await youtubeService.search(query)
    const items = result.items
    const formattedItems = items.map(i => formatItem(i))
    let size = formattedItems.length
    let idQuery = null
    for (let i = 0; i < size; i++) {
      if (idQuery === null) {
        idQuery = formattedItems[i].linkId + '%2C+'
      } else if (i === (size - 1)) {
        idQuery = idQuery + formattedItems[i].linkId
      } else {
        idQuery = idQuery + formattedItems[i].linkId + '%2C+'
      }
    }
    const viewQuery = `videos?part=statistics&id=${idQuery}`
    const viewResults = await youtubeService.search(viewQuery)
    for (let i = 0; i < size; i++) {
      formattedItems[i].views = viewResults.items[i].statistics.viewCount
    }

    window.localStorage.setItem('ytSearchResults', JSON.stringify(formattedItems))

    dispatch({
      type: 'SEARCH_YOUTUBE',
      data: formattedItems
    })
  }
}

export const searchResultInitialization = () => {
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
  return async (dispatch) => {
    window.localStorage.removeItem('ytSearchResults')
    dispatch({
      type: 'CLEAR_RESULTS'
    })
  }
}

export default ytReducer
