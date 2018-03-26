import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import ytReducer from './reducers/ytReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
/*import favouriteLinksReducer from './reducers/favouriteLinksReducer'
import playlistsReducer from './reducers/playlistsReducer'*/
import userLinksReducer from './reducers/userLinksReducer'
import ytSearchBarReducer from './reducers/ytSearchBarReducer'
import playlistPlayingReducer from './reducers/playlistPlayingReducer'
import ytRelatedVideosReducer from './reducers/ytRelatedVideosReducer'

const reducer = combineReducers({
  users: userReducer,
  ytSearchResults: ytReducer,
  loggedUser: loggedUserReducer,
  /*favouriteLinks: favouriteLinksReducer,
  playlists: playlistsReducer*/
  userLinks: userLinksReducer,
  ytSearchBar: ytSearchBarReducer,
  playingPlaylist: playlistPlayingReducer,
  relatedLinks: ytRelatedVideosReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
