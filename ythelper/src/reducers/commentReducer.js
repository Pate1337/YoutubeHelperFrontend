import commentService from '../services/comments'
import userService from '../services/users'

const commentReducer = (store = { rComments: [], sentComments: [] }, action) => {
  switch (action.type) {
    case 'GET_COMMENTS_ID':
      console.log('GET_ALL commentReducer')
      console.log('GET ALL COMMENT REDUCER', action.data)
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
    case 'REMOVE_ONE_COMMENT':
      console.log('REMOVE_ONE_COMMENT commentReducer')
      return {
        rComments: store.rComments.filter(comment => comment.id != action.commentId),
        sentComments: store.sentComments
      }
    default:
      return store
  }
}

export const allUsersComments = (userP) => {
  console.log('allUsersComments commentReducer', userP)

  return async (dispatch) => {
    try {

      const comments = await commentService.getByReceiver(userP)
      console.log('COMMENTREDUCER FIRST COMMENT', comments[0])
      dispatch({
        type: 'GET_COMMENTS_ID',
        data: {
          rComments: comments
        }
      })

    } catch (e) {
      return 'error'
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

export const removeOneComment = (commentId) => {
  console.log('removeOneComment commentsReducer', commentId)
  return async (dispatch) => {
    try {
      const rmresult = await commentService.deleteOneComment(commentId)
      console.log('kommentti poistettu')
      dispatch({
        type: 'REMOVE_ONE_COMMENT',
        commentId: commentId
      })
    } catch (e) {
      return 'error'
    }
  }
}

export default commentReducer