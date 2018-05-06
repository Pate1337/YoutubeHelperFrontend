import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo } from '../reducers/ytReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { updateSearchBar } from '../reducers/ytSearchBarReducer'
import { Grid, Form, Button, Dropdown, Icon } from 'semantic-ui-react'

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
      maxResults: maxResults,
      gridStyle: {height: 250}
    }
  }

  handleSearchFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleDropdownChange = (event, { value }) => {
    console.log('VALUE: ' + value)
    this.setState({
      maxResults: value
    })
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
    this.setState({
      gridStyle: {}
    })
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
      text: '',
      gridStyle: {height: 250}
    })

  }

  render() {
    console.log('Renderöidään YTSearchBar')
    const options = [
      {key: 1, text: '5', value: 5},
      {key: 2, text: '10', value: 10},
      {key: 3, text: '25', value: 25},
      {key: 4, text: '50', value: 50}
    ]
    const maxResults = this.state.maxResults
    let gridStyle = this.state.gridStyle
    let searchBarStyle = {width: '400px'}
    const searchResultsJSON = window.localStorage.getItem('ytSearchResults')
    if (searchResultsJSON) {
      gridStyle = {}
    }
    if (window.innerWidth <= 750) {
      searchBarStyle = {width: '160px'}
    }
    return (
      <Grid style={gridStyle}>
        <Grid.Column>
          <h2>Search from Youtube</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
            <Form.Input
              style={searchBarStyle}
              type='text'
              name='text'
              value={this.state.text}
              onChange={this.handleSearchFieldChange}
              icon='search'
              placeholder='Search...'
            />
            <Button icon type='submit'>
              <Icon name='search' />
            </Button>
            <Button icon type='button' onClick={this.clearResults}>
              <Icon name='undo' />
            </Button>
            <Form.Select
              inline
              compact
              label='Max results:'
              onChange={this.handleDropdownChange}
              options={options}
              selection
              value={maxResults}
              name='maxResults'
            />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}
/*placeholder={this.state.maxResults.toString()}*/
/*<Form.Select name='maxResults' onChange={this.handleSearchFieldChange}>
  <option value='5' selected={(this.state.maxResults.toString() === '5') ? true : false}>5</option>
  <option value='10' selected={(this.state.maxResults.toString() === '10') ? true : false}>10</option>
  <option value='25' selected={(this.state.maxResults.toString() === '25') ? true : false}>25</option>
  <option value='50' selected={(this.state.maxResults.toString() === '50') ? true : false}>50</option>
</Form.Select>*/
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
