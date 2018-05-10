import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo } from '../reducers/ytReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { updateSearchBar } from '../reducers/ytSearchBarReducer'
import { Grid, Form, Button, Dropdown, Icon, Popup } from 'semantic-ui-react'
import { searchSuggestions, clearAutocomplete } from '../reducers/autocompleteReducer'


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

  handleSearchFieldChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.value !== '') {
      await this.props.searchSuggestions(event.target.value)
    } else {
      await this.props.clearAutocomplete()
    }
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
    /*let searchBarStyle = {width: '400px'}*/
    const searchResultsJSON = window.localStorage.getItem('ytSearchResults')
    if (searchResultsJSON) {
      gridStyle = {}
    }
    /*if (window.innerWidth <= 750) {*/
      let searchBarStyle = {width: '55%', marginRight: '2px'}
    /*}*/
    const onlyShowOnMobile = { display: (window.innerWidth <= 750) ? '' : 'none'}
    const onlyShowOnComputer = { display: (window.innerWidth > 750) ? '' : 'none'}
    return (
      <Grid style={gridStyle}>
        <Grid.Column>
          <h2>Search from Youtube</h2>
          <Form onSubmit={this.handleSubmit} autoComplete='off'>
            <Form.Group>
              <div style={searchBarStyle}>
                <Form.Input
                  type='text'
                  name='text'
                  value={this.state.text}
                  onChange={this.handleSearchFieldChange}
                  icon='search'
                  placeholder='Search...'
                />
              </div>
              <Button icon type='submit'>
                <Icon name='search' />
              </Button>
              <Popup
                trigger={<Button icon type='button' onClick={this.clearResults}>
                    <Icon name='undo' />
                  </Button>}
                content='Clear search results'
              />
              <div style={onlyShowOnComputer}>
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
              </div>
              <div style={onlyShowOnMobile}>
                <Popup
                  trigger={
                    <Button icon type='button'>
                      <Icon name='options' />
                    </Button>}
                  content={
                    <Form.Select
                      inline
                      compact
                      label='Max results:'
                      onChange={this.handleDropdownChange}
                      options={options}
                      selection
                      value={maxResults}
                      name='maxResults'
                    />}
                  on='click'
                  hideOnScroll
                />
              </div>
            </Form.Group>
          </Form>
          <div style={{borderStyle: 'solid', width: '55%'}}>
            {this.props.autocompleteItems.map((i, index) => <div key={index}>{i}</div>)}
          </div>
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
    maxResults: state.ytSearchBar.maxResults,
    autocompleteItems: state.autocomplete
  }
}

const mapDispatchToProps = {
  searchForVideo,
  clearSearchResults,
  updateSearchBar,
  searchSuggestions,
  clearAutocomplete
}

const ConnectedYTSearchBar = connect(mapStateToProps, mapDispatchToProps)(YTSearchBar)

export default ConnectedYTSearchBar
