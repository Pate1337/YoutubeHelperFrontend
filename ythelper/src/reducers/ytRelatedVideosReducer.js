import youtubeService from '../services/youtube'

const ytRelatedVideosReducer = (store = [], action) => {
  switch (action.type) {
    case 'ADD':
      return action.data
    default:
      return store
  }
}

export const searchForRelatedVideos = (videoId) => {
  console.log('searchForRelatedVideos ytReducer')
  const query = `search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20`
  /*formatItem tähän*/
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
      type: 'ADD',
      data: formattedItems
    })
  }
}

export default ytRelatedVideosReducer
