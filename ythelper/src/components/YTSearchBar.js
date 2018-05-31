import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo, setSearching } from '../reducers/ytReducer'
import { clearSearchResults } from '../reducers/ytReducer'
import { updateSearchBar } from '../reducers/ytSearchBarReducer'
import { Grid, Form, Button, Dropdown, Icon, Popup, List, Segment } from 'semantic-ui-react'
import { searchSuggestions, clearAutocomplete } from '../reducers/autocompleteReducer'
import { setActiveItem } from '../reducers/menuReducer'

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
    }
    this.state = {
      text: text,
      maxResults: maxResults,
      gridStyle: {height: 450},
      drawMobileSearch: false
    }
  }

  componentDidMount() {
    this.props.clearAutocomplete()
    if (this.props.history === undefined) {
      this.props.setActiveItem('/search')
    } else {
      this.props.setActiveItem('/mobileSearch')
      this.setState({
        text: ''
      })
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
    this.setState({
      maxResults: value
    })
  }

  handleSubmit = (event) => {
    if (this.state.text !== '') {
      this.props.setSearching()
      const searchObject = {
        text: this.state.text,
        maxResults: this.state.maxResults
      }
      this.props.searchForVideo(searchObject)
      window.localStorage.setItem('ytSearchBar', JSON.stringify(searchObject))
    }
    this.props.clearAutocomplete()
    this.setState({
      gridStyle: {}
    })
    if (this.props.history !== undefined) {
      this.props.history.push('/search')
    }
  }

  clearResults = async (event) => {
    event.preventDefault()
    this.props.clearSearchResults()
    const searchObject = {
      text: '',
      maxResults: this.state.maxResults
    }
    window.localStorage.setItem('ytSearchBar', JSON.stringify(searchObject))
    this.setState({
      text: '',
      gridStyle: {height: 450}
    })
    await this.props.clearAutocomplete()
  }

  handleInputClick = async (event) => {
    await this.props.searchSuggestions(this.state.text)
  }

  handleElsewhereClick = async (event) => {
    await this.props.clearAutocomplete()
  }

  handleSuggestionClick = async (item) => {
    await this.props.clearAutocomplete()
    this.setState({
      text: item
    })
    this.handleSubmit()
  }

  goBack = async (event) => {
    this.props.history.push('/search')
  }

  render() {
    const options = [
      {key: 1, text: '5', value: 5},
      {key: 2, text: '10', value: 10},
      {key: 3, text: '25', value: 25},
      {key: 4, text: '50', value: 50}
    ]
    const maxResults = this.state.maxResults
    let gridStyle = this.state.gridStyle
    const searchResultsJSON = window.localStorage.getItem('ytSearchResults')
    if (searchResultsJSON) {
      gridStyle = {}
    }
      let mobileSearchStyle = {
        position: 'fixed',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        background: 'white',
        zIndex: 1002
      }
    let suggestStyle = {borderStyle: 'solid', width: '55%', position: 'absolute', zIndex: 100, background: 'white'}
    if (this.props.autocompleteItems.length === 0) {
      suggestStyle = {width: '55%', position: 'absolute', zIndex: 100, background: 'white'}
    }
    let searchBarStyle = {width: '55%', marginRight: '2px'}
    const onlyShowOnMobile = { display: (window.innerHeight <= 800) ? '' : 'none'}
    const onlyShowOnComputer = { display: (window.innerHeight > 800) ? '' : 'none'}
    if (this.props.history === undefined) {
      return (
        <div onClick={this.handleElsewhereClick} style={onlyShowOnComputer}>
        <Grid style={gridStyle}>
          <Grid.Column>
            <h2>Search from Youtube</h2>
            <Form onSubmit={this.handleSubmit} autoComplete='off' style={{marginLeft: '2%'}}>
              <Form.Group>
                <div style={searchBarStyle}>
                  <Form.Input
                    type='text'
                    name='text'
                    value={this.state.text}
                    onChange={this.handleSearchFieldChange}
                    icon='search'
                    placeholder='Search from Youtube...'
                    onClick={this.handleInputClick}
                  />
                </div>
                <Button icon type='submit'>
                  <Icon name='search' />
                </Button>
                <Button title='Clear search results' icon type='button' onClick={this.clearResults}>
                  <Icon name='undo' />
                </Button>
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

              </Form.Group>
            </Form>
            <div style={suggestStyle}>
              <List selection verticalAlign='middle'>
                {this.props.autocompleteItems.map((i, index) =>
                  <List.Item key={index} onClick={() => this.handleSuggestionClick(i)}>
                    {i}
                  </List.Item>)}
              </List>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  } else {
    return (
      <div style={mobileSearchStyle}>
      <Grid>
        <Grid.Column>
          <Segment basic inverted color='black'>
          <Form onSubmit={this.handleSubmit} autoComplete='off' style={{marginLeft: '2%'}}>
            <Form.Group>
              <Button basic color='blue' icon type='button' onClick={this.goBack}>
                <Icon name='arrow left' />
              </Button>
              <div style={searchBarStyle}>
                <Form.Input
                  autoFocus
                  type='text'
                  name='text'
                  value={this.state.text}
                  onChange={this.handleSearchFieldChange}
                  placeholder='Search from Youtube...'
                  onClick={this.handleInputClick}
                />
              </div>
              <Button icon basic color='blue' type='submit'>
                <Icon name='search' />
              </Button>

                <Popup
                  trigger={
                    <Button icon basic color='blue' type='button'>
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

            </Form.Group>
          </Form>
          </Segment>
          <div style={{width: '100%', height: '48%', zIndex: 100, background: 'white', overflow: 'auto'}}>

            <List divided selection verticalAlign='middle'>
              {this.props.autocompleteItems.map((i, index) =>
                <List.Item key={index} onClick={() => this.handleSuggestionClick(i)}>
                  {i}
                </List.Item>)}
            </List>

          </div>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
  }
}

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
  clearAutocomplete,
  setActiveItem,
  setSearching
}

const ConnectedYTSearchBar = connect(mapStateToProps, mapDispatchToProps)(YTSearchBar)

export default ConnectedYTSearchBar
