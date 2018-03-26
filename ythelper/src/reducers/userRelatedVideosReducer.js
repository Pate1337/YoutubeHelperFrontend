/*import linkService from '../services/links'
import userService from '../services/users'*/

/*const userRelatedVideosReducer = (store = [], action) => {
  switch (action.type) {
    default:
      return store
    case 'ADD':
      return [...store, action.data]
    case 'REMOVE':
      const newRelateds = store.filter(l => l._id !== action.linkId)
      return newRelateds
  }
}

export const addToUserRelated = (linkObjects) => {
  return async (dispatch) => {
    const links = await linkService.addLinksToRelated(linkObjects)
    console.log('addToUserRelated links.length: ' + links.length)
    dispatch({
      type: 'ADD',
      data: links
    })
  }
}

export const removeRelatedFromUser = (linkId) => {
  return async (dispatch) => {
    try {
      await linkService.removeLinkFromRelated(linkId)
      dispatch({
        type: 'REMOVE',
        linkId: linkId
      })
    } catch (exception) {
      return 'error'
    }
  }
}
*/
/*export const usersRelatedInitialization = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        const related = await userService.getUsersRelated(loggedUser.id)
        dispatch({
          type: 'INIT',
          data: related
        })
      }
    } catch (exception) {
      return 'error'
    }
  }
}
*/
/*export default userRelatedVideosReducer*/
