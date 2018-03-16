import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import ytReducer from './reducers/ytReducer'
import loggedUserReducer from './reducers/loggedUserReducer'

const reducer = combineReducers({
  users: userReducer,
  ytSearchResults: ytReducer,
  loggedUser: loggedUserReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
