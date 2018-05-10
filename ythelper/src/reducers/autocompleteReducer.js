import autocompleteService from '../services/autoComplete'

const autocompleteReducer = (store = [], action) => {
  switch (action.type) {
    case 'SEARCH_AUTOCOMPLETE':
      return action.data
    case 'CLEAR_AUTOCOMPLETE':
      return []
    default:
      return store
  }
}

export const searchSuggestions = (query) => {
  const formatItem = (item) => {
    console.log('item[0]: ' + item[0])
    return item[0]
  }
  return async (dispatch) => {
    const result = await autocompleteService.search(query)
    console.log('RESULTTI: ' + result)
    const strings = result[1]
    console.log('STRINGS: ' + strings)
    const formattedItems = strings.map(i => formatItem(i))
    dispatch({
      type: 'SEARCH_AUTOCOMPLETE',
      data: formattedItems
    })
  }
}

export const clearAutocomplete = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_AUTOCOMPLETE'
    })
  }
}

export default autocompleteReducer
