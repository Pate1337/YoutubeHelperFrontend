import commentService from '../services/comments'
import userService from '../services/users'

const commentReducer = (store = { rComments: [], sentComments: [] }, action) => {
  switch (action.type) {
    case 'GET_ALL':
      console.log('GET_ALL commentReducer')
      return action.data
    case 'ADD_RECEIVED_COMMENT':
      console.log('ADD_RECEIVED_COMMENT commentReducer')
      return {
        rComments: store.rComments.concat(action.comment),
        sentComments: store.sentComments
      }
    case 'ADD_SENT_COMMENT':
      console.log('ADD_SENT_COMMENT commentReducer')
      return {
        rComments: store.rComments,
        sentComments: store.sentComments.concat(action.comment)
      }
    default:
      return store
  }
}

export const allComments = () => {
  console.log('allComments commentReducer')
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const user = await userService.getUserById(loggedUser.id)
      console.log('user: ' + user)
      dispatch({
        type: 'GET_ALL',
        data: {
          rComments: user.rComments || null,
          sentComments: user.sentComments || null
        }
      })
    }
  }
}

export const addReceivedComment = (commentObject) => {
  console.log('addComment commentReducer')
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        commentService.setToken(user.token)
        const comment = await commentService.addComment(commentObject)
        dispatch({
          type: 'ADD_RECEIVED_COMMENT',
          data: comment
        })
      }
    } catch (e) {
      return 'error'
    }
  }
}

export const addSentComment = (commentObject) => {
  console.log('addSentComment commentReducer')
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        commentService.setToken(user.token)
        const comment = await commentService.addComment(commentObject)
        dispatch({
          type: 'ADD_SENT_COMMENT',
          data: commentObject
        })
      }
    } catch (e) {
      return 'error'
    }
  }
}

export default commentReducer