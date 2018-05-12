import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo } from '../reducers/ytReducer'
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
      console.log('text: ' + text + ', maxResults: ' + maxResults)
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
    console.log('VALUE: ' + value)
    this.setState({
      maxResults: value
    })
  }

  handleSubmit = (event) => {
    console.log('handleSubmit YTSearchBar')
    /*event.preventDefault()*/
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
    this.props.clearAutocomplete()
    this.setState({
      gridStyle: {},
      /*drawMobileSearch: false*/
    })
    if (this.props.history !== undefined) {
      this.props.history.push('/search')
    }
  }

  clearResults = async (event) => {
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
      gridStyle: {height: 450}
    })
    await this.props.clearAutocomplete()
  }

  handleInputClick = async (event) => {
    console.log('PAINETTU')
    await this.props.searchSuggestions(this.state.text)
    /*if (window.innerHeight <= 800) {
      this.setState({
        drawMobileSearch: true
      })
    }*/
  }

  handleElsewhereClick = async (event) => {
    console.log('painettu muualta')
    await this.props.clearAutocomplete()
  }

  handleSuggestionClick = async (item) => {
    console.log('NAME: ' + item)
    await this.props.clearAutocomplete()
    this.setState({
      text: item
      /*drawMobileSearch: false*/
    })
    this.handleSubmit()
  }

  goBack = async (event) => {
    this.props.history.push('/search')
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
    /*let mobileSearchStyle = {}*/
    /*if (this.state.drawMobileSearch) {*/
      let mobileSearchStyle = {
        position: 'fixed',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        background: 'white',
        zIndex: 1002
      }
    /*}*/
    let suggestStyle = {borderStyle: 'solid', width: '55%', position: 'absolute', zIndex: 100, background: 'white'}
    if (this.props.autocompleteItems.length === 0) {
      suggestStyle = {width: '55%', position: 'absolute', zIndex: 100, background: 'white'}
    }
    /*if (window.innerWidth <= 750) {*/
      let searchBarStyle = {width: '55%', marginRight: '2px'}
    /*}*/
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
                  /*let boundItemClick = this.handleSuggestionClick.bind('MOI')*/
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
              <Button icon type='button' onClick={this.goBack}>
                <Icon name='arrow left' />
              </Button>
              <div style={searchBarStyle}>
                <Form.Input
                  autoFocus
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

            </Form.Group>
          </Form>
          </Segment>
          <div style={{width: '100%', height: '48%', zIndex: 100, background: 'white', overflow: 'auto'}}>

            <List selection verticalAlign='middle'>
              {this.props.autocompleteItems.map((i, index) =>
                /*let boundItemClick = this.handleSuggestionClick.bind('MOI')*/
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
  clearAutocomplete,
  setActiveItem
}

const ConnectedYTSearchBar = connect(mapStateToProps, mapDispatchToProps)(YTSearchBar)

export default ConnectedYTSearchBar
