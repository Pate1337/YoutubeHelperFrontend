import youtubeService from '../services/youtube'

const ytRelatedVideosReducer = (store = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_RELATEDS':
      return action.data
    default:
      return store
  }
}

export const searchForRelatedVideos = (videoId) => {
  console.log('searchForRelatedVideos ytReducer')
  const query = `search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10`
  /*formatItem tähän*/
  const formatItem = (item) => {
    console.log(item.snippet.title + ', ' + item.id.videoId)
    return {
      linkId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    }
  }

  return async () => {
    const result = await youtubeService.search(query)
    const items = result.items
    console.log('YOUTUBE APISTA HAETUT RELATEDIT:')
    const formattedItems = items.map(i => formatItem(i))
    /*dispatch({
      type: 'ADD_NEW_RELATEDS',
      data: formattedItems
    })*/
    return formattedItems
  }
}

export default ytRelatedVideosReducer
