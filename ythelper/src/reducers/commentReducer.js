import commentService from '../services/comments'
import userService from '../services/users'

const commentReducer = (store = { rComments: [], sentComments: [] }, action) => {
  switch (action.type) {
    case 'GET_COMMENTS_ID':
      return action.data
    case 'ADD_RECEIVED_COMMENT':
      return {
        rComments: store.rComments.concat(action.comment),
        sentComments: store.sentComments
      }
    case 'ADD_SENT_COMMENT':
      return {
        rComments: store.rComments,
        sentComments: store.sentComments.concat(action.comment)
      }
    case 'REMOVE_ONE_COMMENT':
      return {
        rComments: store.rComments.filter(comment => comment.id != action.commentId),
        sentComments: store.sentComments
      }
    default:
      return store
  }
}

export const allUsersComments = (userP) => {

  return async (dispatch) => {
    try {

      const comments = await commentService.getByReceiver(userP)
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
  return async (dispatch) => {
    try {
      const rmresult = await commentService.deleteOneComment(commentId)
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
