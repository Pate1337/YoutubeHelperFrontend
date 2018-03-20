import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo } from '../reducers/ytReducer'
import { clearSearchResults } from '../reducers/ytReducer'

class YTSearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      maxResults: 5
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
    }
  }

  clearResults = (event) => {
    console.log('clearResults YTSearchBar')
    event.preventDefault()
    this.props.clearSearchResults()
    this.setState({
      text: ''
    })

  }

  render() {
    console.log('Renderöidään YTSearchBar')

    return (
      <div>
        <h2>Hae Youtubesta</h2>
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
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  searchForVideo,
  clearSearchResults
}

const ConnectedYTSearchBar = connect(null, mapDispatchToProps)(YTSearchBar)

export default ConnectedYTSearchBar
