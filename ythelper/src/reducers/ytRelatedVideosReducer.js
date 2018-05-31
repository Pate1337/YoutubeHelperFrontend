import youtubeService from '../services/youtube'

const ytRelatedVideosReducer = (store = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_RELATEDS':
      return action.data
    default:
      return store
  }
}

export const searchForRelatedVideos = (videoId, maxResults) => {
  const query = `search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=${maxResults}`
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
    dispatch({
      type: 'ADD_NEW_RELATEDS',
      data: formattedItems
    })
    return formattedItems
  }
}

export default ytRelatedVideosReducer
