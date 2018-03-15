import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import ytReducer from './reducers/ytReducer'

const reducer = combineReducers({
  users: userReducer,
  ytSearchResults: ytReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
