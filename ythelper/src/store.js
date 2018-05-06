import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import ytReducer from './reducers/ytReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userLinksReducer from './reducers/userLinksReducer'
import ytSearchBarReducer from './reducers/ytSearchBarReducer'
import playlistPlayingReducer from './reducers/playlistPlayingReducer'
import ytRelatedVideosReducer from './reducers/ytRelatedVideosReducer'
import serverReducer from './reducers/serverReducer'
import commentReducer from './reducers/commentReducer'
import videoPlayingReducer from './reducers/videoPlayingReducer'
import menuReducer from './reducers/menuReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  users: userReducer,
  ytSearchResults: ytReducer,
  loggedUser: loggedUserReducer,
  userLinks: userLinksReducer,
  ytSearchBar: ytSearchBarReducer,
  playingPlaylist: playlistPlayingReducer,
  relatedLinks: ytRelatedVideosReducer,
  serverOnUse: serverReducer,
  userComments: commentReducer,// tää reduceri pitää korjata
  playingVideo: videoPlayingReducer,
  activeItem: menuReducer,
  notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
