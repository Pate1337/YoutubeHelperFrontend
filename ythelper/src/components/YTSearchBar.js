import React from 'react'
import { connect } from 'react-redux'
import { searchForVideo } from '../reducers/ytReducer'

class YTSearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  handleSearchFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    console.log('handleSubmit YTSearchBar')
    event.preventDefault()
    /*Kun tulevaisuudessa useampi kenttä, esim. järjestys, hakutulosten määrä..*/
    const searchObject = {
      text: this.state.text
    }
    this.props.searchForVideo(searchObject)
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
            Hae
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  searchForVideo
}

const ConnectedYTSearchBar = connect(null, mapDispatchToProps)(YTSearchBar)

export default ConnectedYTSearchBar
