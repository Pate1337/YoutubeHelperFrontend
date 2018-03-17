import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import ytReducer from './reducers/ytReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import favouriteLinksReducer from './reducers/favouriteLinksReducer'

const reducer = combineReducers({
  users: userReducer,
  ytSearchResults: ytReducer,
  loggedUser: loggedUserReducer,
  favouriteLinks: favouriteLinksReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
