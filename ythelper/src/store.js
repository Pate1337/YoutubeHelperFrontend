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

const reducer = combineReducers({
  users: userReducer,
  ytSearchResults: ytReducer,
  loggedUser: loggedUserReducer,
  /*favouriteLinks: favouriteLinksReducer,
  playlists: playlistsReducer*/
  userLinks: userLinksReducer,
  ytSearchBar: ytSearchBarReducer,
  playingPlaylist: playlistPlayingReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
