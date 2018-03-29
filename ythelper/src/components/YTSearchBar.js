import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo } from '../reducers/ytReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { updateSearchBar } from '../reducers/ytSearchBarReducer'

class YTSearchBar extends React.Component {
  constructor() {
    super()
    const searchBarJSON = window.localStorage.getItem('ytSearchBar')
    let text = ''
    let maxResults = 5
    if (searchBarJSON) {
      const searchBar = JSON.parse(searchBarJSON)
      text = searchBar.text
      maxResults = searchBar.maxResults
      console.log('text: ' + text + ', maxResults: ' + maxResults)
    }
    this.state = {
      text: text,
      maxResults: maxResults
    }
  }

  handleSearchFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    console.log('handleSubmit YTSearchBar')
    event.preventDefault()
    console.log('maxresults: ' + this.state.maxResults)
    if (this.state.text !== '') {
      /*Kun tulevaisuudessa useampi kenttä, esim. järjestys, hakutulosten määrä..*/
      const searchObject = {
        text: this.state.text,
        maxResults: this.state.maxResults
      }
      this.props.searchForVideo(searchObject)
      window.localStorage.setItem('ytSearchBar', JSON.stringify(searchObject))
    }
  }

  clearResults = (event) => {
    console.log('clearResults YTSearchBar')
    event.preventDefault()
    this.props.clearSearchResults()
    const searchObject = {
      text: '',
      maxResults: this.state.maxResults
    }
    window.localStorage.setItem('ytSearchBar', JSON.stringify(searchObject))
    this.setState({
      text: ''
    })

  }

  render() {
    console.log('Renderöidään YTSearchBar')
    return (
      <div>
        <h2>Search from Youtube</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='text'
            value={this.state.text}
            onChange={this.handleSearchFieldChange}
          />
          <button type='submit'>
            Search
          </button>
          <button type='button' onClick={this.clearResults}>
            Clear search results
          </button>
          Max results:
          <select name='maxResults' onChange={this.handleSearchFieldChange}>
            <option value='5' selected={(this.state.maxResults.toString() === '5') ? true : false}>5</option>
            <option value='10' selected={(this.state.maxResults.toString() === '10') ? true : false}>10</option>
            <option value='25' selected={(this.state.maxResults.toString() === '25') ? true : false}>25</option>
            <option value='50' selected={(this.state.maxResults.toString() === '50') ? true : false}>50</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.ytSearchBar.text,
    maxResults: state.ytSearchBar.maxResults
  }
}

const mapDispatchToProps = {
  searchForVideo,
  clearSearchResults,
  updateSearchBar
}

const ConnectedYTSearchBar = connect(mapStateToProps, mapDispatchToProps)(YTSearchBar)

export default ConnectedYTSearchBar
