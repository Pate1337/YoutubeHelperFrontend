
const ytSearchBarReducer = (store = { text: '', maxResults: 5 }, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        text: action.data.text,
        maxResults: action.data.maxResults
      }
    default:
      return store
  }
}

export const updateSearchBar = (searchObject) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE',
      data: searchObject
    })
  }
}

export default ytSearchBarReducer
